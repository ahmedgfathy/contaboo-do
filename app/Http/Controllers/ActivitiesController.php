<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Lead;
use App\Models\Property;
use App\Models\Opportunity;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivitiesController extends Controller
{
    public function index(Request $request)
    {
        $query = Activity::with(['assignedTo', 'createdBy', 'related']);

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by priority
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        // Filter by assigned user
        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->whereDate('due_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('due_date', '<=', $request->date_to);
        }

        // Filter by overdue
        if ($request->filled('overdue') && $request->overdue == '1') {
            $query->overdue();
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortField = $request->get('sort', 'due_date');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $activities = $query->paginate(15)->withQueryString();

        return Inertia::render('Activities/Index', [
            'activities' => $activities,
            'filters' => $request->only(['search', 'type', 'status', 'priority', 'assigned_to', 'date_from', 'date_to', 'overdue']),
            'users' => User::select('id', 'name')->get(),
            'types' => ['call', 'email', 'meeting', 'task', 'note'],
            'statuses' => ['pending', 'in_progress', 'completed', 'cancelled'],
            'priorities' => ['low', 'medium', 'high', 'urgent'],
        ]);
    }

    public function create()
    {
        return Inertia::render('Activities/Create', [
            'users' => User::select('id', 'name')->get(),
            'leads' => Lead::select('id', 'first_name', 'last_name')->get()->map(function($lead) {
                return [
                    'id' => $lead->id,
                    'name' => $lead->first_name . ' ' . $lead->last_name,
                ];
            }),
            'properties' => Property::select('id', 'title')->get(),
            'opportunities' => Opportunity::select('id', 'title')->get(),
            'types' => ['call', 'email', 'meeting', 'task', 'note'],
            'priorities' => ['low', 'medium', 'high', 'urgent'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:call,email,meeting,task,note',
            'subject' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'priority' => 'required|in:low,medium,high,urgent',
            'status' => 'nullable|in:pending,in_progress,completed,cancelled',
            'duration' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'related_type' => 'nullable|string|in:Lead,Property,Opportunity',
            'related_id' => 'nullable|integer',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();
        $validated['status'] = $validated['status'] ?? 'pending';

        Activity::create($validated);

        return redirect()->route('activities.index')->with('success', 'Activity created successfully.');
    }

    public function show(Activity $activity)
    {
        $activity->load(['assignedTo', 'createdBy', 'updatedBy', 'related']);

        return Inertia::render('Activities/Show', [
            'activity' => $activity,
        ]);
    }

    public function edit(Activity $activity)
    {
        $activity->load('related');

        return Inertia::render('Activities/Edit', [
            'activity' => $activity,
            'users' => User::select('id', 'name')->get(),
            'leads' => Lead::select('id', 'first_name', 'last_name')->get()->map(function($lead) {
                return [
                    'id' => $lead->id,
                    'name' => $lead->first_name . ' ' . $lead->last_name,
                ];
            }),
            'properties' => Property::select('id', 'title')->get(),
            'opportunities' => Opportunity::select('id', 'title')->get(),
            'types' => ['call', 'email', 'meeting', 'task', 'note'],
            'priorities' => ['low', 'medium', 'high', 'urgent'],
            'statuses' => ['pending', 'in_progress', 'completed', 'cancelled'],
        ]);
    }

    public function update(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            'type' => 'required|in:call,email,meeting,task,note',
            'subject' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'priority' => 'required|in:low,medium,high,urgent',
            'status' => 'required|in:pending,in_progress,completed,cancelled',
            'duration' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'related_type' => 'nullable|string|in:Lead,Property,Opportunity',
            'related_id' => 'nullable|integer',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $validated['updated_by'] = auth()->id();

        // Update completed_at based on status
        if ($validated['status'] === 'completed' && !$activity->completed_at) {
            $validated['completed_at'] = now();
        } elseif ($validated['status'] !== 'completed') {
            $validated['completed_at'] = null;
        }

        $activity->update($validated);

        return redirect()->route('activities.index')->with('success', 'Activity updated successfully.');
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();

        return redirect()->route('activities.index')->with('success', 'Activity deleted successfully.');
    }

    public function complete(Activity $activity)
    {
        $activity->complete();

        return back()->with('success', 'Activity marked as completed.');
    }

    public function uncomplete(Activity $activity)
    {
        $activity->uncomplete();

        return back()->with('success', 'Activity marked as incomplete.');
    }
}
