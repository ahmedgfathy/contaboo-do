# Laravel + React User Management System

This is a complete Laravel application with React frontend and role-based permission system using Spatie's Laravel-Permission package.

## Features

- ✅ Laravel 12 with SQLite database
- ✅ React frontend with Inertia.js
- ✅ User authentication (Login/Register)
- ✅ Role-based access control (Admin, Moderator, User)
- ✅ Permission management
- ✅ User management interface

## Installation & Setup

The application is already installed and configured. To run it:

### 1. Start the Development Server

```bash
php artisan serve
```

Then open your browser to: http://localhost:8000

### 2. (Optional) Start Vite for Hot Module Replacement

In a new terminal:

```bash
npm run dev
```

## Default Test Accounts

The following test accounts have been created for you:

### Admin Account
- **Email:** admin@example.com
- **Password:** password
- **Role:** Admin
- **Permissions:** All permissions (view, create, edit, delete users and roles)

### Regular User Account
- **Email:** user@example.com
- **Password:** password
- **Role:** User
- **Permissions:** View users only

## Roles & Permissions

### Available Roles:
1. **Admin** - Full access to all features
2. **Moderator** - Can view and edit users, view roles
3. **User** - Can only view users

### Available Permissions:
- view users
- create users
- edit users
- delete users
- view roles
- create roles
- edit roles
- delete roles

## Project Structure

```
contaboo-do/
├── app/
│   ├── Http/Controllers/
│   │   └── UserManagementController.php    # User management logic
│   ├── Models/
│   │   └── User.php                        # User model with HasRoles trait
│   └── Providers/
│       └── AppServiceProvider.php          # Permission gates configuration
├── database/
│   ├── migrations/                         # Database migrations
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── RolePermissionSeeder.php        # Seeds roles & permissions
├── resources/
│   └── js/
│       ├── Pages/
│       │   ├── Dashboard.jsx               # Dashboard with role/permission display
│       │   └── Users/
│       │       └── Index.jsx               # User management interface
│       └── Layouts/
│           └── AuthenticatedLayout.jsx     # Main layout
└── routes/
    └── web.php                             # Application routes
```

## Usage

### Login
1. Visit http://localhost:8000
2. Click "Log in"
3. Use one of the test accounts above

### View Dashboard
After logging in, you'll see:
- Your assigned roles
- Your permissions
- A "Manage Users" button (if you have the "view users" permission)

### Manage Users (Admin only)
1. Navigate to the Users page from the Dashboard
2. View all users with their roles
3. Edit user roles (if you have "edit users" permission)
4. Delete users (if you have "delete users" permission)

## Available Artisan Commands

```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Run migrations
php artisan migrate

# Seed database with roles and permissions
php artisan db:seed

# Reset database and reseed
php artisan migrate:fresh --seed

# Create a new admin user (via tinker)
php artisan tinker
>>> $user = User::create(['name' => 'New Admin', 'email' => 'newadmin@example.com', 'password' => bcrypt('password')]);
>>> $user->assignRole('admin');
```

## Technology Stack

- **Backend:** Laravel 12
- **Frontend:** React 18 with Inertia.js
- **Authentication:** Laravel Breeze
- **Permissions:** Spatie Laravel-Permission
- **Database:** SQLite
- **Build Tool:** Vite
- **Styling:** Tailwind CSS

## Next Steps

You can extend this application by:
1. Adding more roles and permissions
2. Creating role management interface
3. Adding permission assignment UI
4. Implementing activity logs
5. Adding email verification
6. Creating API endpoints

## Support

For Laravel documentation: https://laravel.com/docs
For Spatie Permission: https://spatie.be/docs/laravel-permission
For Inertia.js: https://inertiajs.com
