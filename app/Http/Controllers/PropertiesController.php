<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\User;
use App\Models\PropertyAudit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PropertiesController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with(['assignedTo', 'createdBy'])
            ->select('properties.*');

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('reference_number', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('country', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%");
            });
        }

        // Type filter
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Listing type filter
        if ($request->filled('listing_type')) {
            $query->where('listing_type', $request->listing_type);
        }

        // Assigned to filter
        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        // Price range filter
        if ($request->filled('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }
        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        // Bedrooms filter
        if ($request->filled('bedrooms')) {
            $query->where('bedrooms', $request->bedrooms);
        }

        // Date range filter
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Sorting
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $properties = $query->paginate(15)->withQueryString();

        $users = User::select('id', 'name')->get();

        // Calculate statistics
        $stats = [
            'total_properties' => Property::count(),
            'for_sale' => Property::where('listing_type', 'sale')->count(),
            'for_rent' => Property::where('listing_type', 'rent')->count(),
            'sold' => Property::where('status', 'sold')->count(),
        ];

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'users' => $users,
            'stats' => $stats,
            'filters' => $request->only(['search', 'type', 'status', 'listing_type', 'assigned_to', 'price_min', 'price_max', 'bedrooms', 'date_from', 'date_to']),
            'types' => ['apartment', 'house', 'villa', 'townhouse', 'studio', 'penthouse', 'duplex', 'land', 'commercial', 'office'],
            'statuses' => ['available', 'sold', 'rented', 'pending', 'off_market'],
            'listing_types' => ['sale', 'rent'],
        ]);
    }

    public function create()
    {
        $users = User::select('id', 'name')->get();
        
        return Inertia::render('Properties/Create', [
            'users' => $users,
            'types' => ['apartment', 'house', 'villa', 'townhouse', 'studio', 'penthouse', 'duplex', 'land', 'commercial', 'office'],
            'statuses' => ['available', 'sold', 'rented', 'pending', 'off_market'],
            'listing_types' => ['sale', 'rent'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:apartment,house,villa,townhouse,studio,penthouse,duplex,land,commercial,office',
            'status' => 'required|in:available,sold,rented,pending,off_market',
            'listing_type' => 'required|in:sale,rent',
            'price' => 'required|numeric|min:0',
            'area' => 'nullable|numeric|min:0',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'parking_spaces' => 'nullable|integer|min:0',
            'floor_number' => 'nullable|integer|min:0',
            'total_floors' => 'nullable|integer|min:0',
            'year_built' => 'nullable|integer|min:1800|max:' . (date('Y') + 5),
            'furnished' => 'boolean',
            'amenities' => 'nullable|array',
            'property_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'reference_number' => 'nullable|string|unique:properties,reference_number',
            'notes' => 'nullable|string',
            'owner_id' => 'nullable|exists:contacts,id',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        // Handle image uploads
        $imagePaths = [];
        if ($request->hasFile('property_images')) {
            foreach ($request->file('property_images') as $image) {
                $path = $image->store('properties', 'public');
                $imagePaths[] = $path;
            }
        }

        $validated['images'] = $imagePaths;
        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        $property = Property::create($validated);

        return redirect()->route('properties.index')->with('success', 'Property created successfully.');
    }

    public function show(Property $property)
    {
        $property->load(['owner', 'assignedTo', 'createdBy', 'updatedBy', 'audits.user']);
        
        return Inertia::render('Properties/Show', [
            'property' => $property,
        ]);
    }

    public function edit(Property $property)
    {
        $users = User::select('id', 'name')->get();
        
        return Inertia::render('Properties/Edit', [
            'property' => $property,
            'users' => $users,
            'types' => ['apartment', 'house', 'villa', 'townhouse', 'studio', 'penthouse', 'duplex', 'land', 'commercial', 'office'],
            'statuses' => ['available', 'sold', 'rented', 'pending', 'off_market'],
            'listing_types' => ['sale', 'rent'],
        ]);
    }

    public function update(Request $request, Property $property)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:apartment,house,villa,townhouse,studio,penthouse,duplex,land,commercial,office',
            'status' => 'required|in:available,sold,rented,pending,off_market',
            'listing_type' => 'required|in:sale,rent',
            'price' => 'required|numeric|min:0',
            'area' => 'nullable|numeric|min:0',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'parking_spaces' => 'nullable|integer|min:0',
            'floor_number' => 'nullable|integer|min:0',
            'total_floors' => 'nullable|integer|min:0',
            'year_built' => 'nullable|integer|min:1800|max:' . (date('Y') + 5),
            'furnished' => 'boolean',
            'amenities' => 'nullable|array',
            'property_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'existing_images' => 'nullable|array',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'reference_number' => ['nullable', 'string', Rule::unique('properties')->ignore($property->id)],
            'notes' => 'nullable|string',
            'owner_id' => 'nullable|exists:contacts,id',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        // Handle image uploads
        $imagePaths = $request->input('existing_images', []);
        
        if ($request->hasFile('property_images')) {
            foreach ($request->file('property_images') as $image) {
                $path = $image->store('properties', 'public');
                $imagePaths[] = $path;
            }
        }

        $validated['images'] = $imagePaths;
        $validated['updated_by'] = auth()->id();

        $property->update($validated);

        return redirect()->route('properties.index')->with('success', 'Property updated successfully.');
    }

    public function destroy(Property $property)
    {
        $property->delete();

        return redirect()->route('properties.index')->with('success', 'Property deleted successfully.');
    }

    public function export(Request $request)
    {
        $query = Property::with(['assignedTo', 'createdBy']);

        // Apply same filters as index
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('reference_number', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('country', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%");
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('listing_type')) {
            $query->where('listing_type', $request->listing_type);
        }

        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        $properties = $query->get();

        $csvData = "Title,Type,Status,Listing Type,Price,Area,Bedrooms,Bathrooms,Address,City,Country,Reference Number,Assigned To,Created At\n";

        foreach ($properties as $property) {
            $csvData .= implode(',', [
                '"' . str_replace('"', '""', $property->title) . '"',
                '"' . str_replace('"', '""', $property->type) . '"',
                '"' . str_replace('"', '""', $property->status) . '"',
                '"' . str_replace('"', '""', $property->listing_type) . '"',
                '"' . str_replace('"', '""', $property->price) . '"',
                '"' . str_replace('"', '""', $property->area ?? '') . '"',
                '"' . str_replace('"', '""', $property->bedrooms ?? '') . '"',
                '"' . str_replace('"', '""', $property->bathrooms ?? '') . '"',
                '"' . str_replace('"', '""', $property->address) . '"',
                '"' . str_replace('"', '""', $property->city) . '"',
                '"' . str_replace('"', '""', $property->country) . '"',
                '"' . str_replace('"', '""', $property->reference_number ?? '') . '"',
                '"' . str_replace('"', '""', $property->assignedTo->name ?? '') . '"',
                '"' . str_replace('"', '""', $property->created_at->format('Y-m-d H:i:s')) . '"',
            ]) . "\n";
        }

        $filename = 'properties_' . date('Y-m-d_His') . '.csv';

        return response($csvData, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $file = $request->file('file');
        $data = array_map('str_getcsv', file($file->getRealPath()));
        $headers = array_shift($data);

        $imported = 0;
        $errors = [];

        DB::beginTransaction();
        try {
            foreach ($data as $index => $row) {
                try {
                    if (count($row) < count($headers)) {
                        continue;
                    }

                    $rowData = array_combine($headers, $row);

                    Property::create([
                        'title' => $rowData['Title'] ?? '',
                        'type' => $rowData['Type'] ?? 'apartment',
                        'status' => $rowData['Status'] ?? 'available',
                        'listing_type' => $rowData['Listing Type'] ?? 'sale',
                        'price' => !empty($rowData['Price']) ? $rowData['Price'] : 0,
                        'area' => !empty($rowData['Area']) ? $rowData['Area'] : null,
                        'bedrooms' => !empty($rowData['Bedrooms']) ? $rowData['Bedrooms'] : null,
                        'bathrooms' => !empty($rowData['Bathrooms']) ? $rowData['Bathrooms'] : null,
                        'address' => $rowData['Address'] ?? '',
                        'city' => $rowData['City'] ?? '',
                        'country' => $rowData['Country'] ?? '',
                        'reference_number' => !empty($rowData['Reference Number']) ? $rowData['Reference Number'] : null,
                        'created_by' => auth()->id(),
                        'updated_by' => auth()->id(),
                    ]);

                    $imported++;
                } catch (\Exception $e) {
                    $errors[] = "Row " . ($index + 2) . ": " . $e->getMessage();
                }
            }

            DB::commit();

            if (!empty($errors)) {
                return redirect()->route('properties.index')
                    ->with('warning', "Imported {$imported} properties with " . count($errors) . " errors.")
                    ->with('errors', $errors);
            }

            return redirect()->route('properties.index')
                ->with('success', "Successfully imported {$imported} properties.");
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('properties.index')
                ->with('error', 'Import failed: ' . $e->getMessage());
        }
    }
}
