<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class LeadPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Create permissions
        $permissions = [
            'view-leads',
            'create-leads',
            'edit-leads',
            'delete-leads',
            'export-leads',
            'import-leads',
            'view-lead-audits',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Assign permissions to admin role
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $adminRole->givePermissionTo($permissions);
        }

        // Assign limited permissions to moderator role
        $moderatorRole = Role::where('name', 'moderator')->first();
        if ($moderatorRole) {
            $moderatorRole->givePermissionTo([
                'view-leads',
                'create-leads',
                'edit-leads',
                'export-leads',
            ]);
        }

        // Assign view only to user role
        $userRole = Role::where('name', 'user')->first();
        if ($userRole) {
            $userRole->givePermissionTo(['view-leads']);
        }
    }
}
