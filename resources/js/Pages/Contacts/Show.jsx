import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ScrollToTop from '@/Components/ScrollToTop';

export default function ShowContact({ contact }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
    };

    const getTypeColor = (type) => {
        const colors = {
            client: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            partner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            vendor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
        };
        return colors[type] || colors.client;
    };

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            inactive: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || colors.active;
    };

    return (
        <AuthenticatedLayout header="Contact Details">
            <Head title={contact.company_name} />

            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href={route('contacts.index')}
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Contacts
                    </Link>
                    <div className="flex gap-3">
                        {contact.original_lead_id && (
                            <Link
                                href={route('leads.show', contact.original_lead_id)}
                                className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                            >
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Original Lead
                            </Link>
                        )}
                        <Link
                            href={route('contacts.edit', contact.id)}
                            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Contact
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {contact.company_name}
                                    </h2>
                                    {contact.contact_person && (
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Contact: {contact.contact_person}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getTypeColor(contact.type)}`}>
                                        {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                                    </span>
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(contact.status)}`}>
                                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                            <div className="space-y-3">
                                {contact.email && (
                                    <div className="flex items-center">
                                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                            {contact.email}
                                        </a>
                                    </div>
                                )}
                                {contact.phone && (
                                    <div className="flex items-center">
                                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <a href={`tel:${contact.phone}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                            {contact.phone}
                                        </a>
                                    </div>
                                )}
                                {contact.mobile && (
                                    <div className="flex items-center">
                                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`tel:${contact.mobile}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                            {contact.mobile}
                                        </a>
                                    </div>
                                )}
                                {contact.website && (
                                    <div className="flex items-center">
                                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                            {contact.website}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {(contact.address || contact.city) && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Address</h3>
                                <div className="flex items-start">
                                    <svg className="mr-2 mt-1 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        {contact.address && <p className="text-gray-900 dark:text-white">{contact.address}</p>}
                                        {contact.city && (
                                            <p className="text-gray-900 dark:text-white">
                                                {contact.city}{contact.state && `, ${contact.state}`} {contact.postal_code}
                                            </p>
                                        )}
                                        {contact.country && <p className="text-gray-900 dark:text-white">{contact.country}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {contact.notes && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Notes</h3>
                                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{contact.notes}</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="space-y-4">
                                {contact.created_by_user && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{contact.created_by_user.name}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">{formatDate(contact.created_at)}</p>
                                </div>
                                {contact.updated_at !== contact.created_at && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{formatDate(contact.updated_at)}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollToTop />
        </AuthenticatedLayout>
    );
}
