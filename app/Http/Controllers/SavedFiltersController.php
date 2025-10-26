<?php

namespace App\Http\Controllers;

use App\Models\SavedFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavedFiltersController extends Controller
{
    public function index(Request $request)
    {
        $module = $request->get('module', 'properties');
        
        $filters = SavedFilter::accessibleBy(Auth::id())
            ->where('module', $module)
            ->with('user:id,name')
            ->orderBy('name')
            ->get();

        return response()->json($filters);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_public' => 'required|boolean',
            'module' => 'required|string|in:properties,leads,opportunities,activities,contacts',
            'columns' => 'nullable|array',
            'conditions' => 'nullable|array',
        ]);

        $validated['user_id'] = Auth::id();

        $filter = SavedFilter::create($validated);

        return response()->json([
            'message' => 'Filter saved successfully',
            'filter' => $filter->load('user:id,name')
        ], 201);
    }

    public function update(Request $request, SavedFilter $savedFilter)
    {
        // Check if user owns the filter
        if ($savedFilter->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_public' => 'required|boolean',
            'columns' => 'nullable|array',
            'conditions' => 'nullable|array',
        ]);

        $savedFilter->update($validated);

        return response()->json([
            'message' => 'Filter updated successfully',
            'filter' => $savedFilter->load('user:id,name')
        ]);
    }

    public function destroy(SavedFilter $savedFilter)
    {
        // Check if user owns the filter
        if ($savedFilter->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $savedFilter->delete();

        return response()->json(['message' => 'Filter deleted successfully']);
    }
}
