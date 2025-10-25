<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $this->authorize('view users');
        
        $users = User::with('roles')->get();
        $roles = Role::all();
        
        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'auth_user_permissions' => auth()->user()->getAllPermissions()->pluck('name'),
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $this->authorize('edit users');
        
        $request->validate([
            'role' => 'required|exists:roles,name',
        ]);

        $user->syncRoles([$request->role]);

        return redirect()->back()->with('success', 'User role updated successfully.');
    }

    public function destroy(User $user)
    {
        $this->authorize('delete users');
        
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}
