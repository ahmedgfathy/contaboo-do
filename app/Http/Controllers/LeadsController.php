<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use App\Models\LeadAudit;
use App\Models\SavedFilter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class LeadsController extends Controller
{
    public function index(Request $request)
    {
        $query = Lead::with(['assignedTo', 'createdBy'])
            ->select('leads.*');

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('job_title', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Source filter
        if ($request->filled('source')) {
            $query->where('source', $request->source);
        }

        // Assigned to filter
        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
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

        $leads = $query->paginate(15)->withQueryString();

        $users = User::select('id', 'name')->get();

        // Calculate statistics
        $stats = [
            'total_leads' => Lead::count(),
            'new_leads' => Lead::where('status', 'new')->count(),
            'contacted_leads' => Lead::where('status', 'contacted')->count(),
            'qualified_leads' => Lead::where('status', 'qualified')->count(),
        ];

        // Get saved filters for this module
        $savedFilters = SavedFilter::accessibleBy(Auth::id())
            ->where('module', 'leads')
            ->orderBy('name')
            ->get();

        // Available columns for filtering
        $availableColumns = [
            ['value' => 'first_name', 'label' => 'First Name'],
            ['value' => 'last_name', 'label' => 'Last Name'],
            ['value' => 'email', 'label' => 'Email'],
            ['value' => 'phone', 'label' => 'Phone'],
            ['value' => 'company', 'label' => 'Company'],
            ['value' => 'job_title', 'label' => 'Job Title'],
            ['value' => 'status', 'label' => 'Status'],
            ['value' => 'source', 'label' => 'Source'],
            ['value' => 'city', 'label' => 'City'],
            ['value' => 'assigned_to', 'label' => 'Assigned To'],
            ['value' => 'created_at', 'label' => 'Created Date'],
        ];

        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'users' => $users,
            'stats' => $stats,
            'savedFilters' => $savedFilters,
            'availableColumns' => $availableColumns,
            'filters' => $request->only(['search', 'status', 'source', 'assigned_to', 'date_from', 'date_to']),
            'statuses' => ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'],
            'sources' => ['website', 'referral', 'social_media', 'email_campaign', 'cold_call', 'trade_show', 'partner', 'other'],
        ]);
    }

    public function create()
    {
        $users = User::select('id', 'name')->get();
        
        return Inertia::render('Leads/Create', [
            'users' => $users,
            'statuses' => ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'],
            'sources' => ['website', 'referral', 'social_media', 'email_campaign', 'cold_call', 'trade_show', 'partner', 'other'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:leads,email',
            'phone' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'status' => 'nullable|in:new,contacted,qualified,proposal,negotiation,won,lost',
            'source' => 'nullable|in:website,referral,social_media,email_campaign,cold_call,trade_show,partner,other',
            'estimated_value' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'assigned_to' => 'nullable|exists:users,id',
            'last_contact_date' => 'nullable|date',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        $lead = Lead::create($validated);

        return redirect()->route('leads.index')->with('success', 'Lead created successfully.');
    }

    public function show(Lead $lead)
    {
        $lead->load(['assignedTo', 'createdBy', 'updatedBy', 'audits.user']);
        
        return Inertia::render('Leads/Show', [
            'lead' => $lead,
        ]);
    }

    public function edit(Lead $lead)
    {
        $users = User::select('id', 'name')->get();
        
        return Inertia::render('Leads/Edit', [
            'lead' => $lead,
            'users' => $users,
            'statuses' => ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'],
            'sources' => ['website', 'referral', 'social_media', 'email_campaign', 'cold_call', 'trade_show', 'partner', 'other'],
        ]);
    }

    public function update(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => ['nullable', 'email', Rule::unique('leads')->ignore($lead->id)],
            'phone' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'status' => 'nullable|in:new,contacted,qualified,proposal,negotiation,won,lost',
            'source' => 'nullable|in:website,referral,social_media,email_campaign,cold_call,trade_show,partner,other',
            'estimated_value' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'assigned_to' => 'nullable|exists:users,id',
            'last_contact_date' => 'nullable|date',
        ]);

        $validated['updated_by'] = auth()->id();

        $lead->update($validated);

        return redirect()->route('leads.index')->with('success', 'Lead updated successfully.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();

        return redirect()->route('leads.index')->with('success', 'Lead deleted successfully.');
    }

    public function export(Request $request)
    {
        $query = Lead::with(['assignedTo', 'createdBy']);

        // Apply same filters as index
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('job_title', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('source')) {
            $query->where('source', $request->source);
        }

        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        $leads = $query->get();

        $csvData = "First Name,Last Name,Email,Phone,Company,Job Title,Status,Source,Estimated Value,Assigned To,Created At\n";

        foreach ($leads as $lead) {
            $csvData .= implode(',', [
                '"' . str_replace('"', '""', $lead->first_name) . '"',
                '"' . str_replace('"', '""', $lead->last_name) . '"',
                '"' . str_replace('"', '""', $lead->email) . '"',
                '"' . str_replace('"', '""', $lead->phone ?? '') . '"',
                '"' . str_replace('"', '""', $lead->company ?? '') . '"',
                '"' . str_replace('"', '""', $lead->job_title ?? '') . '"',
                '"' . str_replace('"', '""', $lead->status) . '"',
                '"' . str_replace('"', '""', $lead->source) . '"',
                '"' . str_replace('"', '""', $lead->estimated_value ?? '') . '"',
                '"' . str_replace('"', '""', $lead->assignedTo->name ?? '') . '"',
                '"' . str_replace('"', '""', $lead->created_at->format('Y-m-d H:i:s')) . '"',
            ]) . "\n";
        }

        $filename = 'leads_' . date('Y-m-d_His') . '.csv';

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

                    Lead::create([
                        'first_name' => $rowData['First Name'] ?? '',
                        'last_name' => $rowData['Last Name'] ?? '',
                        'email' => $rowData['Email'] ?? '',
                        'phone' => $rowData['Phone'] ?? null,
                        'company' => $rowData['Company'] ?? null,
                        'job_title' => $rowData['Job Title'] ?? null,
                        'status' => $rowData['Status'] ?? 'new',
                        'source' => $rowData['Source'] ?? 'website',
                        'estimated_value' => !empty($rowData['Estimated Value']) ? $rowData['Estimated Value'] : null,
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
                return redirect()->route('leads.index')
                    ->with('warning', "Imported {$imported} leads with " . count($errors) . " errors.")
                    ->with('errors', $errors);
            }

            return redirect()->route('leads.index')
                ->with('success', "Successfully imported {$imported} leads.");
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('leads.index')
                ->with('error', 'Import failed: ' . $e->getMessage());
        }
    }
}
