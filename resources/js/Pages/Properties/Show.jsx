import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowProperty({ property }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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

    const getActionColor = (action) => {
        const colors = {
            created: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            updated: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            deleted: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
            restored: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            status_changed: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            assigned: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
            price_changed: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        };
        return colors[action] || colors.updated;
    };

    const getListingTypeColor = (listingType) => {
        return listingType === 'sale' 
            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    };

    return (
        <AuthenticatedLayout header="Property Details">
            <Head title={property.title} />

            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href={route('properties.index')}
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Properties
                    </Link>
                    <Link
                        href={route('properties.edit', property.id)}
                        className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Property
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
                                        {property.title}
                                    </h2>
                                    {property.reference_number && (
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Ref: {property.reference_number}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(property.status)}`}>
                                        {property.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                    </span>
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getListingTypeColor(property.listing_type)}`}>
                                        {property.listing_type.charAt(0).toUpperCase() + property.listing_type.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {property.description && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</h3>
                                    <p className="mt-2 text-gray-900 dark:text-white whitespace-pre-wrap">{property.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Property Details */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Property Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                                    </p>
                                </div>
                                {property.area && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Area</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{property.area} m²</p>
                                    </div>
                                )}
                                {property.bedrooms && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bedrooms</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{property.bedrooms}</p>
                                    </div>
                                )}
                                {property.bathrooms && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bathrooms</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{property.bathrooms}</p>
                                    </div>
                                )}
                                {property.parking_spaces && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Parking Spaces</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{property.parking_spaces}</p>
                                    </div>
                                )}
                                {property.year_built && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Year Built</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{property.year_built}</p>
                                    </div>
                                )}
                                {property.floor_number && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Floor</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">
                                            {property.floor_number}{property.total_floors && ` / ${property.total_floors}`}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Furnished</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.furnished ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {property.amenities.map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                        >
                                            <svg className="mr-1.5 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Location */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <svg className="mr-2 mt-1 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-gray-900 dark:text-white">{property.address}</p>
                                        <p className="text-gray-900 dark:text-white">
                                            {property.city}{property.state && `, ${property.state}`}
                                        </p>
                                        <p className="text-gray-900 dark:text-white">
                                            {property.country}{property.postal_code && ` ${property.postal_code}`}
                                        </p>
                                    </div>
                                </div>
                                {(property.latitude && property.longitude) && (
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Coordinates: {property.latitude}, {property.longitude}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Notes */}
                        {property.notes && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Additional Notes</h3>
                                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{property.notes}</p>
                            </div>
                        )}

                        {/* Activity Log */}
                        {property.audits && property.audits.length > 0 && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Activity Log</h3>
                                <div className="flow-root">
                                    <div className="-mb-8 max-h-96 overflow-y-auto">
                                        {property.audits.map((audit, index) => (
                                            <div key={audit.id} className="relative pb-8">
                                                {index !== property.audits.length - 1 && (
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
                        {/* Price */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</h3>
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                ${parseFloat(property.price).toLocaleString()}
                            </p>
                        </div>

                        {/* Assignment & Dates */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="space-y-4">
                                {property.assigned_to && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{property.assigned_to.name}</p>
                                    </div>
                                )}
                                {property.created_by && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{property.created_by.name}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">{formatDate(property.created_at)}</p>
                                </div>
                                {property.updated_at !== property.created_at && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{formatDate(property.updated_at)}</p>
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
