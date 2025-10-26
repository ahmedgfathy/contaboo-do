import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ lead }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            qualified: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            proposal: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
            negotiation: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
            won: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            lost: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || colors.new;
    };

    const getActionColor = (action) => {
        const colors = {
            created: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            updated: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            deleted: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
            status_changed: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            assigned: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
        };
        return colors[action] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    };

    return (
        <AuthenticatedLayout header={lead.full_name}>
            <Head title={`Lead - ${lead.full_name}`} />

            <div className="space-y-6">
                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route('leads.index')}
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Leads
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href={route('opportunities.create', { lead_id: lead.id })}
                            className="inline-flex items-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-green-700 hover:to-emerald-700"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Opportunity
                        </Link>
                        <Link
                            href={route('leads.edit', lead.id)}
                            className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Lead
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                            </div>
                            <div className="p-6">
                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.full_name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                            <a href={`mailto:${lead.email}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                                {lead.email}
                                            </a>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {lead.phone ? (
                                                <a href={`tel:${lead.phone}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                                    {lead.phone}
                                                </a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Title</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.job_title || 'N/A'}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Lead Requirements */}
                        {(lead.requirements || lead.budget || lead.property_type || lead.property_category || lead.no_of_rooms || lead.no_of_bathrooms || lead.asking) && (
                            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Requirements</h3>
                                </div>
                                <div className="p-6">
                                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        {lead.requirements && (
                                            <div className="sm:col-span-2">
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Requirements</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{lead.requirements}</dd>
                                            </div>
                                        )}
                                        {lead.budget && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget</dt>
                                                <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                    ${parseFloat(lead.budget).toLocaleString()}
                                                </dd>
                                            </div>
                                        )}
                                        {lead.property_type && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Type</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                                    {lead.property_type.charAt(0).toUpperCase() + lead.property_type.slice(1)}
                                                </dd>
                                            </div>
                                        )}
                                        {lead.property_category && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Category</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                                    {lead.property_category.charAt(0).toUpperCase() + lead.property_category.slice(1)}
                                                </dd>
                                            </div>
                                        )}
                                        {lead.no_of_rooms !== null && lead.no_of_rooms !== undefined && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">No. of Rooms</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.no_of_rooms}</dd>
                                            </div>
                                        )}
                                        {lead.no_of_bathrooms !== null && lead.no_of_bathrooms !== undefined && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">No. of Bathrooms</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.no_of_bathrooms}</dd>
                                            </div>
                                        )}
                                        {lead.asking && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Asking</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                                    {lead.asking.charAt(0).toUpperCase() + lead.asking.slice(1)}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>
                        )}

                        {/* Company Information */}
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company Information</h3>
                            </div>
                            <div className="p-6">
                                <dl className="grid grid-cols-1 gap-6">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.company || 'N/A'}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Address */}
                        {(lead.address || lead.city || lead.state || lead.country) && (
                            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Address</h3>
                                </div>
                                <div className="p-6">
                                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        {lead.address && (
                                            <div className="sm:col-span-2">
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Street Address</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.address}</dd>
                                            </div>
                                        )}
                                        {lead.city && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">City</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.city}</dd>
                                            </div>
                                        )}
                                        {lead.state && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">State</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.state}</dd>
                                            </div>
                                        )}
                                        {lead.postal_code && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Postal Code</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.postal_code}</dd>
                                            </div>
                                        )}
                                        {lead.country && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.country}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        {lead.notes && (
                            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notes</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{lead.notes}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status & Details */}
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Details</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                                    <dd className="mt-1">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(lead.status)}`}>
                                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                        </span>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Source</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {lead.source.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Value</dt>
                                    <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                        {lead.estimated_value ? `$${parseFloat(lead.estimated_value).toLocaleString()}` : 'N/A'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {lead.assigned_to?.name || 'Unassigned'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Contact</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {lead.last_contact_date ? formatDate(lead.last_contact_date) : 'N/A'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.created_by?.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(lead.created_at)}</dd>
                                </div>
                            </div>
                        </div>

                        {/* Brief History */}
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Brief History</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* Creation */}
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                            <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Created</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            by {lead.created_by?.name || 'Unknown'}
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                            {formatDate(lead.created_at)}
                                        </p>
                                    </div>
                                </div>

                                {/* Last Update */}
                                {lead.updated_at && lead.updated_at !== lead.created_at && (
                                    <div className="flex items-start space-x-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Last Modified</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                by {lead.updated_by?.name || 'Unknown'}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                {formatDate(lead.updated_at)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* View Full History Link */}
                                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <Link
                                        href={route('activities.index', { related_type: 'Lead', related_id: lead.id })}
                                        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        View Full Activity History
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Audit Log */}
                        {lead.audits && lead.audits.length > 0 && (
                            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Log</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto p-4">
                                    <div className="flow-root">
                                        <ul className="-mb-8">
                                            {lead.audits.map((audit, index) => (
                                                <li key={audit.id}>
                                                    <div className="relative pb-8">
                                                        {index !== lead.audits.length - 1 && (
                                                            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                                                        )}
                                                        <div className="relative flex space-x-3">
                                                            <div>
                                                                <span className={`flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-800 ${getActionColor(audit.action)}`}>
                                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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
                                                                        by {audit.user?.name}
                                                                    </p>
                                                                </div>
                                                                <div className="whitespace-nowrap text-right text-xs text-gray-500 dark:text-gray-400">
                                                                    {formatDate(audit.created_at)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
