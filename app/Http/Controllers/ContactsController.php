<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\SavedFilter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ContactsController extends Controller
{
    public function index(Request $request)
    {
        $query = Contact::with(['createdBy', 'updatedBy']);

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by country
        if ($request->filled('country')) {
            $query->where('country', $request->country);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('contact_person', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortField = $request->get('sort', 'company_name');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $contacts = $query->paginate(15)->withQueryString();

        // Calculate statistics
        $stats = [
            'total_clients' => Contact::where('type', 'client')->count(),
            'total_partners' => Contact::where('type', 'partner')->count(),
            'total_agents' => Contact::where('type', 'agent')->count(),
            'total_brokers' => Contact::where('type', 'broker')->count(),
        ];

        // Get saved filters for this module
        $savedFilters = SavedFilter::accessibleBy(Auth::id())
            ->where('module', 'contacts')
            ->orderBy('name')
            ->get();

        // Available columns for filtering
        $availableColumns = [
            ['value' => 'company_name', 'label' => 'Company Name'],
            ['value' => 'contact_person', 'label' => 'Contact Person'],
            ['value' => 'email', 'label' => 'Email'],
            ['value' => 'phone', 'label' => 'Phone'],
            ['value' => 'mobile', 'label' => 'Mobile'],
            ['value' => 'type', 'label' => 'Type'],
            ['value' => 'status', 'label' => 'Status'],
            ['value' => 'city', 'label' => 'City'],
            ['value' => 'country', 'label' => 'Country'],
            ['value' => 'created_at', 'label' => 'Created Date'],
        ];

        return Inertia::render('Contacts/Index', [
            'contacts' => $contacts,
            'stats' => $stats,
            'savedFilters' => $savedFilters,
            'availableColumns' => $availableColumns,
            'filters' => $request->only(['search', 'type', 'status', 'country']),
            'types' => ['client', 'partner', 'vendor', 'other'],
            'statuses' => ['active', 'inactive'],
        ]);
    }

    public function create()
    {
        return Inertia::render('Contacts/Create', [
            'types' => ['client', 'partner', 'vendor', 'other'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:client,partner,vendor,other',
            'company_name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'mobile' => 'nullable|string|max:50',
            'website' => 'nullable|url|max:255',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'status' => 'nullable|in:active,inactive',
            'notes' => 'nullable|string',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();
        $validated['status'] = $validated['status'] ?? 'active';

        Contact::create($validated);

        return redirect()->route('contacts.index')->with('success', 'Contact created successfully.');
    }

    public function show(Contact $contact)
    {
        $contact->load(['createdBy', 'updatedBy', 'activities.assignedTo', 'originalLead']);

        return Inertia::render('Contacts/Show', [
            'contact' => $contact,
        ]);
    }

    public function edit(Contact $contact)
    {
        return Inertia::render('Contacts/Edit', [
            'contact' => $contact,
            'types' => ['client', 'partner', 'vendor', 'other'],
            'statuses' => ['active', 'inactive'],
        ]);
    }

    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'type' => 'required|in:client,partner,vendor,other',
            'company_name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'mobile' => 'nullable|string|max:50',
            'website' => 'nullable|url|max:255',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'status' => 'required|in:active,inactive',
            'notes' => 'nullable|string',
        ]);

        $validated['updated_by'] = auth()->id();

        $contact->update($validated);

        return redirect()->route('contacts.index')->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contacts.index')->with('success', 'Contact deleted successfully.');
    }

    public function export(Request $request)
    {
        $query = Contact::query();

        // Apply same filters as index
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('contact_person', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $contacts = $query->get();

        $csv = "Company Name,Contact Person,Type,Email,Phone,Mobile,Website,Address,City,State,Country,Postal Code,Status\n";

        foreach ($contacts as $contact) {
            $csv .= sprintf(
                '"%s","%s","%s","%s","%s","%s","%s","%s","%s","%s","%s","%s","%s"' . "\n",
                $contact->company_name,
                $contact->contact_person,
                $contact->type,
                $contact->email,
                $contact->phone,
                $contact->mobile,
                $contact->website,
                $contact->address,
                $contact->city,
                $contact->state,
                $contact->country,
                $contact->postal_code,
                $contact->status
            );
        }

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="contacts.csv"',
        ]);
    }

    public function searchByPhone(Request $request)
    {
        $phone = $request->get('phone');
        
        if (strlen($phone) < 3) {
            return response()->json([]);
        }

        $contacts = Contact::where('phone', 'like', "%{$phone}%")
            ->orWhere('mobile', 'like', "%{$phone}%")
            ->select('id', 'company_name', 'contact_person', 'phone', 'mobile', 'type')
            ->limit(10)
            ->get();

        return response()->json($contacts);
    }

    public function quickCreate(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'mobile' => 'nullable|string|max:20',
            'type' => 'required|in:owner,agent,broker,other',
        ]);

        $validated['status'] = 'active';
        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        $contact = Contact::create($validated);

        return response()->json($contact);
    }
}
