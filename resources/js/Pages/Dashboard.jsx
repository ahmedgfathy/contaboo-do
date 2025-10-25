import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ user_roles = [], user_permissions = [] }) {
    const canViewUsers = user_permissions.includes('view users');

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-semibold mb-4">Welcome to your Dashboard!</h3>
                            <p className="mb-4">You're logged in!</p>
                            
                            <div className="mt-6">
                                <h4 className="font-semibold mb-2">Your Roles:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {user_roles.length > 0 ? (
                                        user_roles.map((role, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                            >
                                                {role}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 dark:text-gray-400">No roles assigned</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-semibold mb-2">Your Permissions:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {user_permissions.length > 0 ? (
                                        user_permissions.map((permission, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            >
                                                {permission}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 dark:text-gray-400">No permissions assigned</span>
                                    )}
                                </div>
                            </div>

                            {canViewUsers && (
                                <div className="mt-6">
                                    <Link
                                        href={route('users.index')}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Manage Users
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
