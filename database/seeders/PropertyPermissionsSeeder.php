<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PropertyPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            'view-properties',
            'create-properties',
            'edit-properties',
            'delete-properties',
            'export-properties',
            'import-properties',
            'view-property-audits',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Assign permissions to roles
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $adminRole->givePermissionTo($permissions);
        }

        $moderatorRole = Role::where('name', 'moderator')->first();
        if ($moderatorRole) {
            $moderatorRole->givePermissionTo([
                'view-properties',
                'create-properties',
                'edit-properties',
                'export-properties',
            ]);
        }

        $userRole = Role::where('name', 'user')->first();
        if ($userRole) {
            $userRole->givePermissionTo(['view-properties']);
        }
    }
}
