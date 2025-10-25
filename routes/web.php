<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\PropertiesController;
use App\Models\Lead;
use App\Models\LeadAudit;
use App\Models\Property;
use App\Models\PropertyAudit;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    // Get statistics
    $totalLeads = Lead::count();
    $totalProperties = Property::count();
    $totalUsers = User::count();
    
    // Leads by status
    $newLeads = Lead::where('status', 'new')->count();
    $qualifiedLeads = Lead::where('status', 'qualified')->count();
    $convertedLeads = Lead::where('status', 'converted')->count();
    
    // Properties by status
    $availableProperties = Property::where('status', 'available')->count();
    $soldProperties = Property::where('status', 'sold')->count();
    $rentedProperties = Property::where('status', 'rented')->count();
    $pendingProperties = Property::where('status', 'pending')->count();
    
    // Properties by listing type
    $propertiesForSale = Property::where('listing_type', 'sale')->count();
    $propertiesForRent = Property::where('listing_type', 'rent')->count();
    
    // Calculate total property value
    $totalPropertyValue = Property::whereIn('status', ['available', 'pending'])->sum('price');
    
    // Recent activities (last 10 from both leads and properties)
    $leadAudits = LeadAudit::with(['user', 'lead'])
        ->latest()
        ->take(5)
        ->get()
        ->map(function ($audit) {
            return [
                'type' => 'lead',
                'description' => $audit->description,
                'user' => $audit->user?->name ?? 'System',
                'created_at' => $audit->created_at,
                'entity_name' => $audit->lead?->name ?? 'Lead',
            ];
        });
    
    $propertyAudits = PropertyAudit::with(['user', 'property'])
        ->latest()
        ->take(5)
        ->get()
        ->map(function ($audit) {
            return [
                'type' => 'property',
                'description' => $audit->description,
                'user' => $audit->user?->name ?? 'System',
                'created_at' => $audit->created_at,
                'entity_name' => $audit->property?->title ?? 'Property',
            ];
        });
    
    $recentActivities = $leadAudits
        ->concat($propertyAudits)
        ->sortByDesc('created_at')
        ->take(10)
        ->values();
    
    return Inertia::render('Dashboard', [
        'stats' => [
            'totalLeads' => $totalLeads,
            'totalProperties' => $totalProperties,
            'totalUsers' => $totalUsers,
            'newLeads' => $newLeads,
            'qualifiedLeads' => $qualifiedLeads,
            'convertedLeads' => $convertedLeads,
            'availableProperties' => $availableProperties,
            'soldProperties' => $soldProperties,
            'rentedProperties' => $rentedProperties,
            'pendingProperties' => $pendingProperties,
            'propertiesForSale' => $propertiesForSale,
            'propertiesForRent' => $propertiesForRent,
            'totalPropertyValue' => $totalPropertyValue,
        ],
        'recentActivities' => $recentActivities,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Leads Routes
    Route::resource('leads', LeadsController::class);
    Route::post('/leads/export', [LeadsController::class, 'export'])->name('leads.export');
    Route::post('/leads/import', [LeadsController::class, 'import'])->name('leads.import');
    
    // Properties Routes
    Route::resource('properties', PropertiesController::class);
    Route::post('/properties/export', [PropertiesController::class, 'export'])->name('properties.export');
    Route::post('/properties/import', [PropertiesController::class, 'import'])->name('properties.import');
    
    // Opportunities Routes
    Route::get('/opportunities', function () {
        return Inertia::render('Opportunities/Index');
    })->name('opportunities.index');
    
    // Reports Routes
    Route::get('/reports', function () {
        return Inertia::render('Reports/Index');
    })->name('reports.index');
    
    // User Management Routes
    Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
    Route::patch('/users/{user}/role', [UserManagementController::class, 'updateRole'])->name('users.updateRole');
    Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/auth.php';
