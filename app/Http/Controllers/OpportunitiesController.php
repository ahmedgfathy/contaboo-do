<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use App\Models\Lead;
use App\Models\Property;
use App\Models\User;
use App\Models\OpportunityAudit;
use App\Models\SavedFilter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class OpportunitiesController extends Controller
{
    public function index(Request $request)
    {
        $query = Opportunity::with(['lead', 'property', 'assignedTo', 'createdBy'])
            ->select('opportunities.*');

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%")
                    ->orWhereHas('lead', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('property', function ($q) use ($search) {
                        $q->where('title', 'like', "%{$search}%");
                    });
            });
        }

        // Stage filter
        if ($request->filled('stage')) {
            $query->where('stage', $request->stage);
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Type filter
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Assigned to filter
        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        // Value range filter
        if ($request->filled('value_min')) {
            $query->where('value', '>=', $request->value_min);
        }
        if ($request->filled('value_max')) {
            $query->where('value', '<=', $request->value_max);
        }

        // Probability range filter
        if ($request->filled('probability_min')) {
            $query->where('probability', '>=', $request->probability_min);
        }
        if ($request->filled('probability_max')) {
            $query->where('probability', '<=', $request->probability_max);
        }

        // Expected close date range filter
        if ($request->filled('date_from')) {
            $query->whereDate('expected_close_date', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->whereDate('expected_close_date', '<=', $request->date_to);
        }

        // Sorting
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $opportunities = $query->paginate(15)->withQueryString();

        $users = User::select('id', 'name')->get();

        // Calculate statistics
        $stats = [
            'total_opportunities' => Opportunity::count(),
            'active_opportunities' => Opportunity::where('status', 'active')->count(),
            'won_opportunities' => Opportunity::where('status', 'won')->count(),
            'lost_opportunities' => Opportunity::where('status', 'lost')->count(),
        ];

        // Get saved filters for this module
        $savedFilters = SavedFilter::accessibleBy(Auth::id())
            ->where('module', 'opportunities')
            ->orderBy('name')
            ->get();

        // Available columns for filtering
        $availableColumns = [
            ['value' => 'title', 'label' => 'Title'],
            ['value' => 'stage', 'label' => 'Stage'],
            ['value' => 'status', 'label' => 'Status'],
            ['value' => 'type', 'label' => 'Type'],
            ['value' => 'value', 'label' => 'Value'],
            ['value' => 'probability', 'label' => 'Probability'],
            ['value' => 'expected_close_date', 'label' => 'Expected Close Date'],
            ['value' => 'lead_id', 'label' => 'Lead'],
            ['value' => 'property_id', 'label' => 'Property'],
            ['value' => 'assigned_to', 'label' => 'Assigned To'],
            ['value' => 'created_at', 'label' => 'Created Date'],
        ];

        return Inertia::render('Opportunities/Index', [
            'opportunities' => $opportunities,
            'users' => $users,
            'stats' => $stats,
            'savedFilters' => $savedFilters,
            'availableColumns' => $availableColumns,
            'filters' => $request->only(['search', 'stage', 'status', 'type', 'assigned_to', 'value_min', 'value_max', 'probability_min', 'probability_max', 'date_from', 'date_to']),
            'stages' => ['qualification', 'viewing', 'negotiation', 'proposal', 'contract', 'closed_won', 'closed_lost'],
            'statuses' => ['active', 'inactive', 'won', 'lost'],
            'types' => ['sale', 'rent', 'lease'],
        ]);
    }

    public function create(Request $request)
    {
        $users = User::select('id', 'name')->get();
        $leads = Lead::select('id', 'first_name', 'last_name', 'email', 'phone')->get();
        $properties = Property::select('id', 'title', 'type', 'price', 'status')->get();
        
        return Inertia::render('Opportunities/Create', [
            'users' => $users,
            'leads' => $leads,
            'properties' => $properties,
            'stages' => ['qualification', 'viewing', 'negotiation', 'proposal', 'contract', 'closed_won', 'closed_lost'],
            'statuses' => ['active', 'inactive', 'won', 'lost'],
            'types' => ['sale', 'rent', 'lease'],
            'preselected_lead_id' => $request->query('lead_id'),
            'preselected_property_id' => $request->query('property_id'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'lead_id' => 'nullable|exists:leads,id',
            'property_id' => 'nullable|exists:properties,id',
            'value' => 'required|numeric|min:0',
            'probability' => 'required|integer|min:0|max:100',
            'stage' => 'required|in:qualification,viewing,negotiation,proposal,contract,closed_won,closed_lost',
            'expected_close_date' => 'nullable|date',
            'actual_close_date' => 'nullable|date',
            'type' => 'required|in:sale,rent,lease',
            'status' => 'required|in:active,inactive,won,lost',
            'notes' => 'nullable|string',
            'lost_reason' => 'nullable|string|max:255',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        $opportunity = Opportunity::create($validated);

        return redirect()->route('opportunities.index')->with('success', 'Opportunity created successfully.');
    }

    public function show(Opportunity $opportunity)
    {
        $opportunity->load(['lead', 'property', 'assignedTo', 'createdBy', 'updatedBy', 'audits.user']);
        
        return Inertia::render('Opportunities/Show', [
            'opportunity' => $opportunity,
        ]);
    }

    public function edit(Opportunity $opportunity)
    {
        $users = User::select('id', 'name')->get();
        $leads = Lead::select('id', 'name', 'email', 'phone')->get();
        $properties = Property::select('id', 'title', 'type', 'price', 'status')->get();
        
        return Inertia::render('Opportunities/Edit', [
            'opportunity' => $opportunity,
            'users' => $users,
            'leads' => $leads,
            'properties' => $properties,
            'stages' => ['qualification', 'viewing', 'negotiation', 'proposal', 'contract', 'closed_won', 'closed_lost'],
            'statuses' => ['active', 'inactive', 'won', 'lost'],
            'types' => ['sale', 'rent', 'lease'],
        ]);
    }

    public function update(Request $request, Opportunity $opportunity)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'lead_id' => 'nullable|exists:leads,id',
            'property_id' => 'nullable|exists:properties,id',
            'value' => 'required|numeric|min:0',
            'probability' => 'required|integer|min:0|max:100',
            'stage' => 'required|in:qualification,viewing,negotiation,proposal,contract,closed_won,closed_lost',
            'expected_close_date' => 'nullable|date',
            'actual_close_date' => 'nullable|date',
            'type' => 'required|in:sale,rent,lease',
            'status' => 'required|in:active,inactive,won,lost',
            'notes' => 'nullable|string',
            'lost_reason' => 'nullable|string|max:255',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $validated['updated_by'] = auth()->id();

        $opportunity->update($validated);

        return redirect()->route('opportunities.index')->with('success', 'Opportunity updated successfully.');
    }

    public function destroy(Opportunity $opportunity)
    {
        $opportunity->delete();

        return redirect()->route('opportunities.index')->with('success', 'Opportunity deleted successfully.');
    }

    public function export(Request $request)
    {
        $query = Opportunity::with(['lead', 'property', 'assignedTo', 'createdBy']);

        // Apply same filters as index
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%");
            });
        }

        if ($request->filled('stage')) {
            $query->where('stage', $request->stage);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        $opportunities = $query->get();

        $csvData = "Title,Lead,Property,Value,Probability,Stage,Type,Status,Expected Close,Assigned To,Created At\n";

        foreach ($opportunities as $opportunity) {
            $csvData .= implode(',', [
                '"' . str_replace('"', '""', $opportunity->title) . '"',
                '"' . str_replace('"', '""', $opportunity->lead->name ?? '') . '"',
                '"' . str_replace('"', '""', $opportunity->property->title ?? '') . '"',
                '"' . str_replace('"', '""', $opportunity->value) . '"',
                '"' . str_replace('"', '""', $opportunity->probability) . '%"',
                '"' . str_replace('"', '""', $opportunity->stage) . '"',
                '"' . str_replace('"', '""', $opportunity->type) . '"',
                '"' . str_replace('"', '""', $opportunity->status) . '"',
                '"' . str_replace('"', '""', $opportunity->expected_close_date?->format('Y-m-d') ?? '') . '"',
                '"' . str_replace('"', '""', $opportunity->assignedTo->name ?? '') . '"',
                '"' . str_replace('"', '""', $opportunity->created_at->format('Y-m-d H:i:s')) . '"',
            ]) . "\n";
        }

        $filename = 'opportunities_' . date('Y-m-d_His') . '.csv';

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

                    Opportunity::create([
                        'title' => $rowData['Title'] ?? '',
                        'value' => !empty($rowData['Value']) ? $rowData['Value'] : 0,
                        'probability' => !empty($rowData['Probability']) ? (int)str_replace('%', '', $rowData['Probability']) : 50,
                        'stage' => $rowData['Stage'] ?? 'qualification',
                        'type' => $rowData['Type'] ?? 'sale',
                        'status' => $rowData['Status'] ?? 'active',
                        'expected_close_date' => !empty($rowData['Expected Close']) ? $rowData['Expected Close'] : null,
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
                return redirect()->route('opportunities.index')
                    ->with('warning', "Imported {$imported} opportunities with " . count($errors) . " errors.")
                    ->with('errors', $errors);
            }

            return redirect()->route('opportunities.index')
                ->with('success', "Successfully imported {$imported} opportunities.");
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('opportunities.index')
                ->with('error', 'Import failed: ' . $e->getMessage());
        }
    }
}
