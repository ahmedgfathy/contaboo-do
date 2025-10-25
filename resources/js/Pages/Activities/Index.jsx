import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function ActivitiesIndex({ activities, types, statuses, priorities, users, filters }) {
    const [showFilters, setShowFilters] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    // Load view preference from localStorage, default to 'list'
    const [viewMode, setViewMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activitiesViewMode') || 'list';
        }
        return 'list';
    });

    // Save view preference when it changes
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('activitiesViewMode', mode);
        }
    };

    const searchForm = useForm({
        search: filters.search || '',
        type: filters.type || '',
        status: filters.status || '',
        type: filters.type || '',
        assigned_to: filters.assigned_to || '',
        value_min: filters.value_min || '',
        value_max: filters.value_max || '',
        bedrooms: filters.bedrooms || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    // Auto-submit search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(route('activities.index'), searchForm.data, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchForm.data.search]);

    // Auto-submit filters immediately when changed
    useEffect(() => {
        if (filters.type !== undefined || filters.status !== undefined || filters.type !== undefined || filters.assigned_to !== undefined || filters.value_min !== undefined || filters.value_max !== undefined || filters.bedrooms !== undefined || filters.date_from !== undefined || filters.date_to !== undefined) {
            router.get(route('activities.index'), searchForm.data, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [searchForm.data.type, searchForm.data.status, searchForm.data.type, searchForm.data.assigned_to, searchForm.data.value_min, searchForm.data.value_max, searchForm.data.bedrooms, searchForm.data.date_from, searchForm.data.date_to]);

    const handleReset = () => {
        searchForm.reset();
        router.get(route('activities.index'), {}, {
            preserveState: false,
            preserveScroll: false,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this activity?')) {
            router.delete(route('activities.destroy', id));
        }
    };

    const handleExport = () => {
        router.post(route('activities.export'), searchForm.data, {
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

        router.post(route('activities.import'), formData, {
            onSuccess: () => {
                setShowImportModal(false);
                setImportFile(null);
            },
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            available: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            sold: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            rented: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            off_market: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
        };
        return colors[status] || colors.available;
    };

    const getTypeLabel = (type) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    const getListingTypeColor = (listingType) => {
        return listingType === 'sale' 
            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    };

    return (
        <AuthenticatedLayout header="Activities Management">
            <Head title="Activities" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('activities.create')}
                            className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Property
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

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 p-1 dark:border-gray-600">
                        <button
                            onClick={() => handleViewModeChange('list')}
                            className={`inline-flex items-center rounded px-3 py-1.5 text-sm font-medium transition ${
                                viewMode === 'list'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                        >
                            <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            List
                        </button>
                        <button
                            onClick={() => handleViewModeChange('card')}
                            className={`inline-flex items-center rounded px-3 py-1.5 text-sm font-medium transition ${
                                viewMode === 'card'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                        >
                            <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Cards
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
                                        placeholder="Search by title, reference number, address, city, country, or notes..."
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
                                    {(filters.search || filters.type || filters.status || filters.type || filters.assigned_to || filters.value_min || filters.value_max || filters.bedrooms || filters.date_from || filters.date_to) && (
                                        <span className="ml-2 inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                                            Active
                                        </span>
                                    )}
                                </button>
                                {(filters.search || filters.type || filters.status || filters.type || filters.assigned_to || filters.value_min || filters.value_max || filters.bedrooms || filters.date_from || filters.date_to) && (
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
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                                        <select
                                            value={searchForm.data.type}
                                            onChange={(e) => searchForm.setData('type', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">All Types</option>
                                            {types.map((type) => (
                                                <option key={type} value={type}>
                                                    {getTypeLabel(type)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

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
                                                    {status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Listing Type</label>
                                        <select
                                            value={searchForm.data.type}
                                            onChange={(e) => searchForm.setData('type', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">All Listing Types</option>
                                            {types.map((lt) => (
                                                <option key={lt} value={lt}>
                                                    {lt.charAt(0).toUpperCase() + lt.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bedrooms</label>
                                        <select
                                            value={searchForm.data.bedrooms}
                                            onChange={(e) => searchForm.setData('bedrooms', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Any Bedrooms</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5+</option>
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
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Min Price</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={searchForm.data.value_min}
                                            onChange={(e) => searchForm.setData('value_min', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Price</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={searchForm.data.value_max}
                                            onChange={(e) => searchForm.setData('value_max', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
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

                {/* Activities List/Card View */}
                {viewMode === 'list' ? (
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Property
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Listing
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Assigned To
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {activities.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-12 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No activities found. Create your first activity!</p>
                                        </td>
                                    </tr>
                                ) : (
                                    activities.data.map((activity) => (
                                        <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {activity.title}
                                                </div>
                                                {activity.reference_number && (
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        Ref: {activity.reference_number}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {getTypeLabel(activity.type)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(activity.status)}`}>
                                                    {activity.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getListingTypeColor(activity.type)}`}>
                                                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-white">{activity.city}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{activity.country}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {activity.bedrooms && `${activity.bedrooms} bed`}
                                                {activity.bedrooms && activity.bathrooms && ' • '}
                                                {activity.bathrooms && `${activity.bathrooms} bath`}
                                                {(activity.bedrooms || activity.bathrooms) && activity.area && ' • '}
                                                {activity.area && `${activity.area} m²`}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                                                ${parseFloat(activity.value).toLocaleString()}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {activity.assigned_to?.name || 'Unassigned'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('activities.show', activity.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('activities.edit', activity.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(activity.id)}
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
                    {activities.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                {activities.prev_page_url && (
                                    <Link
                                        href={activities.prev_page_url}
                                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {activities.next_page_url && (
                                    <Link
                                        href={activities.next_page_url}
                                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing <span className="font-medium">{activities.from}</span> to <span className="font-medium">{activities.to}</span> of{' '}
                                        <span className="font-medium">{activities.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                        {activities.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-indigo-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                    index === activities.links.length - 1 ? 'rounded-r-md' : ''
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
                ) : (
                    /* Card View */
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {activities.data.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No activities found. Create your first activity!</p>
                            </div>
                        ) : (
                            activities.data.map((activity) => (
                                <div key={activity.id} className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg dark:bg-gray-800">
                                    {/* Property Image */}
                                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                                        {activity.images && activity.images.length > 0 ? (
                                            <img
                                                src={`/storage/${activity.images[0]}`}
                                                alt={activity.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(activity.status)}`}>
                                                {activity.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                            </span>
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getListingTypeColor(activity.type)}`}>
                                                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="p-5">
                                        <div className="mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {activity.title}
                                            </h3>
                                            {activity.reference_number && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Ref: {activity.reference_number}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {activity.city}, {activity.country}
                                        </div>

                                        <div className="mb-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            {activity.bedrooms && (
                                                <span className="flex items-center">
                                                    <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    {activity.bedrooms} bed
                                                </span>
                                            )}
                                            {activity.bathrooms && (
                                                <span className="flex items-center">
                                                    <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {activity.bathrooms} bath
                                                </span>
                                            )}
                                            {activity.area && (
                                                <span className="flex items-center">
                                                    <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                    </svg>
                                                    {activity.area} m²
                                                </span>
                                            )}
                                        </div>

                                        <div className="mb-4 border-t border-gray-200 pt-3 dark:border-gray-700">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
                                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                                    ${parseFloat(activity.value).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Link
                                                href={route('activities.show', activity.id)}
                                                className="flex-1 rounded-lg bg-indigo-600 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                                            >
                                                View Details
                                            </Link>
                                            <Link
                                                href={route('activities.edit', activity.id)}
                                                className="flex-1 rounded-lg border border-gray-300 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Pagination */}
                {activities.links.length > 3 && (
                    <div className="flex items-center justify-between rounded-lg border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            {activities.prev_page_url && (
                                <Link
                                    href={activities.prev_page_url}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {activities.next_page_url && (
                                <Link
                                    href={activities.next_page_url}
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing <span className="font-medium">{activities.from}</span> to <span className="font-medium">{activities.to}</span> of{' '}
                                    <span className="font-medium">{activities.total}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    {activities.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                link.active
                                                    ? 'z-10 bg-indigo-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                index === activities.links.length - 1 ? 'rounded-r-md' : ''
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

            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowImportModal(false)}></div>
                        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Import Activities</h3>
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
                                        Expected columns: Title, Type, Status, Listing Type, Price, Area, Bedrooms, Bathrooms, Address, City, Country, Reference Number
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
