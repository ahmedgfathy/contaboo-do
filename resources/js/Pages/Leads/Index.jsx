import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function LeadsIndex({ leads, users, filters, statuses, sources }) {
    const [showFilters, setShowFilters] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [selectedLeads, setSelectedLeads] = useState([]);

    const searchForm = useForm({
        search: filters.search || '',
        status: filters.status || '',
        source: filters.source || '',
        assigned_to: filters.assigned_to || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    // Auto-submit search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(route('leads.index'), searchForm.data, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchForm.data.search]);

    // Auto-submit filters immediately when changed
    useEffect(() => {
        if (filters.status !== undefined || filters.source !== undefined || filters.assigned_to !== undefined || filters.date_from !== undefined || filters.date_to !== undefined) {
            router.get(route('leads.index'), searchForm.data, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [searchForm.data.status, searchForm.data.source, searchForm.data.assigned_to, searchForm.data.date_from, searchForm.data.date_to]);

    const handleReset = () => {
        searchForm.reset();
        router.get(route('leads.index'), {}, {
            preserveState: false,
            preserveScroll: false,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this lead?')) {
            router.delete(route('leads.destroy', id));
        }
    };

    const handleExport = () => {
        router.post(route('leads.export'), searchForm.data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleImport = (e) => {
        e.preventDefault();
        if (!importFile) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', importFile);

        router.post(route('leads.import'), formData, {
            onSuccess: () => {
                setShowImportModal(false);
                setImportFile(null);
            },
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

    return (
        <AuthenticatedLayout header="Leads Management">
            <Head title="Leads" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('leads.create')}
                            className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Lead
                        </Link>
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Import
                        </button>
                        <button
                            onClick={handleExport}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export
                        </button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="p-4">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, phone, company, job title, notes, address, or city..."
                                        value={searchForm.data.search}
                                        onChange={(e) => searchForm.setData('search', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                >
                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filters
                                    {(filters.search || filters.status || filters.source || filters.assigned_to || filters.date_from || filters.date_to) && (
                                        <span className="ml-2 inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                                            Active
                                        </span>
                                    )}
                                </button>
                                {(filters.search || filters.status || filters.source || filters.assigned_to || filters.date_from || filters.date_to) && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            {showFilters && (
                                <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700 md:grid-cols-2 lg:grid-cols-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                        <select
                                            value={searchForm.data.status}
                                            onChange={(e) => searchForm.setData('status', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">All Statuses</option>
                                            {statuses.map((status) => (
                                                <option key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Source</label>
                                        <select
                                            value={searchForm.data.source}
                                            onChange={(e) => searchForm.setData('source', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">All Sources</option>
                                            {sources.map((source) => (
                                                <option key={source} value={source}>
                                                    {source.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigned To</label>
                                        <select
                                            value={searchForm.data.assigned_to}
                                            onChange={(e) => searchForm.setData('assigned_to', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">All Users</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date From</label>
                                        <input
                                            type="date"
                                            value={searchForm.data.date_from}
                                            onChange={(e) => searchForm.setData('date_from', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date To</label>
                                        <input
                                            type="date"
                                            value={searchForm.data.date_to}
                                            onChange={(e) => searchForm.setData('date_to', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Company
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Source
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Assigned To
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Value
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {leads.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No leads found. Create your first lead!</p>
                                        </td>
                                    </tr>
                                ) : (
                                    leads.data.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {lead.full_name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {lead.job_title}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-white">{lead.email}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{lead.phone}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {lead.company || '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(lead.status)}`}>
                                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {lead.source.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {lead.assigned_to?.name || 'Unassigned'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {lead.estimated_value ? `$${parseFloat(lead.estimated_value).toLocaleString()}` : '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('leads.show', lead.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('leads.edit', lead.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(lead.id)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {leads.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                {leads.prev_page_url && (
                                    <Link
                                        href={leads.prev_page_url}
                                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {leads.next_page_url && (
                                    <Link
                                        href={leads.next_page_url}
                                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing <span className="font-medium">{leads.from}</span> to <span className="font-medium">{leads.to}</span> of{' '}
                                        <span className="font-medium">{leads.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                        {leads.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-indigo-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                    index === leads.links.length - 1 ? 'rounded-r-md' : ''
                                                } border border-gray-300 dark:border-gray-600`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowImportModal(false)}></div>
                        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Import Leads</h3>
                            <form onSubmit={handleImport} className="mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        CSV File
                                    </label>
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => setImportFile(e.target.files[0])}
                                        className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Expected columns: First Name, Last Name, Email, Phone, Company, Job Title, Status, Source, Estimated Value
                                    </p>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowImportModal(false)}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                                    >
                                        Import
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
