import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function OpportunitiesIndex() {
    return (
        <AuthenticatedLayout header="Opportunities">
            <Head title="Opportunities" />

            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                <div className="p-6">
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Opportunities Management</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This page is under construction. Opportunity tracking features will be available soon.</p>
                        <div className="mt-6">
                            <button className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700">
                                <svg className="-ml-0.5 mr-1.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Opportunity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
