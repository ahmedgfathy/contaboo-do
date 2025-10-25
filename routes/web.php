<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\LeadsController;
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
    return Inertia::render('Dashboard');
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
    Route::get('/properties', function () {
        return Inertia::render('Properties/Index');
    })->name('properties.index');
    
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
