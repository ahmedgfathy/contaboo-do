import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowOpportunity({ activity }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
            won: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            lost: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || colors.active;
    };

    const getStageColor = (stage) => {
        const colors = {
            qualification: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
            viewing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            negotiation: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            proposal: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            contract: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
            closed_won: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            closed_lost: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[stage] || colors.qualification;
    };

    const getActionColor = (action) => {
        const colors = {
            created: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            updated: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            stage_changed: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            status_changed: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        };
        return colors[action] || colors.updated;
    };

    return (
        <AuthenticatedLayout header="Opportunity Details">
            <Head title={activity.title} />

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
                        Edit Opportunity
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Information */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {activity.title}
                                    </h2>
                                </div>
                                <div className="flex gap-2">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(activity.status)}`}>
                                        {activity.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                    </span>
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStageColor(activity.stage)}`}>
                                        {activity.stage.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Deal Value</p>
                                    <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(activity.value)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Probability</p>
                                    <div className="mt-1 flex items-center">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{activity.probability}%</span>
                                        <div className="ml-3 flex-1">
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    className="h-full bg-indigo-600"
                                                    style={{ width: `${activity.probability}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lead Information */}
                        {activity.lead && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Information</h3>
                                    <Link
                                        href={route('leads.show', activity.lead.id)}
                                        className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                                    >
                                        View Lead →
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="text-gray-900 dark:text-white">{activity.lead.full_name}</span>
                                    </div>
                                    {activity.lead.email && (
                                        <div className="flex items-center">
                                            <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <a href={`mailto:${activity.lead.email}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                                {activity.lead.email}
                                            </a>
                                        </div>
                                    )}
                                    {activity.lead.phone && (
                                        <div className="flex items-center">
                                            <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <a href={`tel:${activity.lead.phone}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                                {activity.lead.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Property Information */}
                        {activity.property && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Property Information</h3>
                                    <Link
                                        href={route('properties.show', activity.property.id)}
                                        className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                                    >
                                        View Property →
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{activity.property.title}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                                            <p className="mt-1 text-gray-900 dark:text-white">
                                                {activity.property.type.charAt(0).toUpperCase() + activity.property.type.slice(1)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</p>
                                            <p className="mt-1 text-gray-900 dark:text-white">{formatCurrency(activity.property.price)}</p>
                                        </div>
                                    </div>
                                    {activity.property.city && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                                            <p className="mt-1 text-gray-900 dark:text-white">{activity.property.city}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Additional Details */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Deal Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Expected Close Date</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">{formatDate(activity.expected_close_date)}</p>
                                </div>
                                {activity.actual_close_date && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Actual Close Date</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{formatDate(activity.actual_close_date)}</p>
                                    </div>
                                )}
                                {activity.assigned_to_user && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{activity.assigned_to_user.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes */}
                        {activity.notes && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Notes</h3>
                                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{activity.notes}</p>
                            </div>
                        )}

                        {/* Lost Reason */}
                        {activity.status === 'lost' && activity.lost_reason && (
                            <div className="rounded-lg bg-red-50 p-6 shadow dark:bg-red-900/20">
                                <h3 className="mb-4 text-lg font-semibold text-red-900 dark:text-red-400">Lost Reason</h3>
                                <p className="text-red-800 dark:text-red-300 whitespace-pre-wrap">{activity.lost_reason}</p>
                            </div>
                        )}

                        {/* Activity Log */}
                        {activity.audits && activity.audits.length > 0 && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Activity Log</h3>
                                <div className="flow-root">
                                    <div className="-mb-8 max-h-96 overflow-y-auto">
                                        {activity.audits.map((audit, index) => (
                                            <div key={audit.id} className="relative pb-8">
                                                {index !== activity.audits.length - 1 && (
                                                    <span
                                                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span className={`flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-800 ${getActionColor(audit.action)}`}>
                                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                        <div>
                                                            <p className="text-sm text-gray-900 dark:text-white">
                                                                {audit.description}
                                                            </p>
                                                            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                                                by {audit.user?.name || 'System'}
                                                            </p>
                                                        </div>
                                                        <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                                                            {formatDate(audit.created_at)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Expected Value</h3>
                            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                {formatCurrency(activity.value * (activity.probability / 100))}
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                ({formatCurrency(activity.value)} × {activity.probability}%)
                            </p>
                        </div>

                        {/* Dates */}
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
