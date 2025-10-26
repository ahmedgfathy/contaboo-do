import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowActivity({ activity }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTypeColor = (type) => {
        const colors = {
            call: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            email: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            meeting: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            task: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            note: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
        };
        return colors[type] || colors.note;
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
            medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
            urgent: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[priority] || colors.medium;
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || colors.pending;
    };

    const formatStatus = (status) => {
        return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <AuthenticatedLayout header="Activity Details">
            <Head title={activity.subject} />

            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href={route('activities.index')}
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Activities
                    </Link>
                    <Link
                        href={route('activities.edit', activity.id)}
                        className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Activity
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {activity.subject}
                                    </h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getTypeColor(activity.type)}`}>
                                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                    </span>
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getPriorityColor(activity.priority)}`}>
                                        {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)}
                                    </span>
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(activity.status)}`}>
                                        {formatStatus(activity.status)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {activity.description && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
                                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{activity.description}</p>
                            </div>
                        )}

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Details</h3>
                            <div className="space-y-3">
                                {activity.due_date && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</span>
                                        </div>
                                        <span className="text-gray-900 dark:text-white">{formatDate(activity.due_date)}</span>
                                    </div>
                                )}
                                {activity.completed_at && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed At</span>
                                        </div>
                                        <span className="text-gray-900 dark:text-white">{formatDate(activity.completed_at)}</span>
                                    </div>
                                )}
                                {activity.duration && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</span>
                                        </div>
                                        <span className="text-gray-900 dark:text-white">{activity.duration}</span>
                                    </div>
                                )}
                                {activity.location && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</span>
                                        </div>
                                        <span className="text-gray-900 dark:text-white">{activity.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {activity.related_type && activity.related && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Related To</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {activity.related_type}
                                        </p>
                                        <p className="mt-1 text-gray-900 dark:text-white">
                                            {activity.related.full_name || activity.related.title || activity.related.company_name || `${activity.related_type} #${activity.related_id}`}
                                        </p>
                                    </div>
                                    {activity.related_type === 'App\\Models\\Lead' && (
                                        <Link
                                            href={route('leads.show', activity.related_id)}
                                            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                                        >
                                            View Lead →
                                        </Link>
                                    )}
                                    {activity.related_type === 'App\\Models\\Property' && (
                                        <Link
                                            href={route('properties.show', activity.related_id)}
                                            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                                        >
                                            View Property →
                                        </Link>
                                    )}
                                    {activity.related_type === 'App\\Models\\Opportunity' && (
                                        <Link
                                            href={route('opportunities.show', activity.related_id)}
                                            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                                        >
                                            View Opportunity →
                                        </Link>
                                    )}
                                    {activity.related_type === 'App\\Models\\Contact' && (
                                        <Link
                                            href={route('contacts.show', activity.related_id)}
                                            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                                        >
                                            View Contact →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        {activity.assigned_to_user && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Assigned To</h3>
                                <div className="flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
                                        {activity.assigned_to_user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 dark:text-white">{activity.assigned_to_user.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.assigned_to_user.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="space-y-4">
                                {activity.created_by_user && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{activity.created_by_user.name}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">{formatDate(activity.created_at)}</p>
                                </div>
                                {activity.updated_at !== activity.created_at && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{formatDate(activity.updated_at)}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {activity.status !== 'completed' && (
                            <Link
                                href={route('activities.complete', activity.id)}
                                method="post"
                                as="button"
                                className="w-full inline-flex justify-center items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                            >
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Mark as Complete
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
