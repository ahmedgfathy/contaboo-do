import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ShowProperty({ property }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    const images = property.images || [];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const openFullscreen = (index) => {
        setCurrentImageIndex(index);
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
    };

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
                    <div className="flex gap-3">
                        <Link
                            href={route('opportunities.create', { property_id: property.id })}
                            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Opportunity
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
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Image Slider */}
                        {images.length > 0 && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Property Images</h3>
                                
                                {/* Main Image Slider */}
                                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                                    <img
                                        src={images[currentImageIndex]}
                                        alt={`Property ${currentImageIndex + 1}`}
                                        className="h-full w-full object-cover cursor-pointer"
                                        onClick={() => openFullscreen(currentImageIndex)}
                                    />
                                    
                                    {/* Navigation Arrows */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition"
                                            >
                                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition"
                                            >
                                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                    
                                    {/* Fullscreen Button */}
                                    <button
                                        onClick={() => openFullscreen(currentImageIndex)}
                                        className="absolute bottom-2 right-2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition"
                                        title="View Fullscreen"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </button>
                                    
                                    {/* Image Counter */}
                                    <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                                        {currentImageIndex + 1} / {images.length}
                                    </div>
                                </div>
                                
                                {/* Thumbnail Strip */}
                                {images.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`flex-shrink-0 overflow-hidden rounded-lg transition ${
                                                    index === currentImageIndex
                                                        ? 'ring-2 ring-indigo-600 dark:ring-indigo-400'
                                                        : 'opacity-60 hover:opacity-100'
                                                }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="h-20 w-28 object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Basic Information */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {property.title}
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Ref: {property.reference_number || <span className="italic">Not assigned</span>}
                                    </p>
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

                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</h3>
                                <p className="mt-2 text-gray-900 dark:text-white whitespace-pre-wrap">
                                    {property.description || <span className="text-gray-400 italic">N/A</span>}
                                </p>
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Property Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.type ? property.type.charAt(0).toUpperCase() + property.type.slice(1) : <span className="text-gray-400 italic">N/A</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Area</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.area ? `${property.area} m²` : <span className="text-gray-400 italic">N/A</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bedrooms</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.bedrooms || <span className="text-gray-400 italic">N/A</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bathrooms</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.bathrooms || <span className="text-gray-400 italic">N/A</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Parking Spaces</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.parking_spaces || <span className="text-gray-400 italic">N/A</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Year Built</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.year_built || <span className="text-gray-400 italic">N/A</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Floor</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.floor_number 
                                            ? `${property.floor_number}${property.total_floors ? ` / ${property.total_floors}` : ''}` 
                                            : <span className="text-gray-400 italic">N/A</span>
                                        }
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Furnished</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.furnished ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Amenities</h3>
                            {property.amenities && property.amenities.length > 0 ? (
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
                            ) : (
                                <p className="text-gray-400 italic">N/A</p>
                            )}
                        </div>

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
                                        <p className="text-gray-900 dark:text-white">
                                            {property.address || <span className="text-gray-400 italic">N/A</span>}
                                        </p>
                                        <p className="text-gray-900 dark:text-white">
                                            {property.city || <span className="text-gray-400 italic">N/A</span>}
                                            {property.state && `, ${property.state}`}
                                        </p>
                                        <p className="text-gray-900 dark:text-white">
                                            {property.country || <span className="text-gray-400 italic">N/A</span>}
                                            {property.postal_code && ` ${property.postal_code}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Coordinates: {(property.latitude && property.longitude) 
                                            ? `${property.latitude}, ${property.longitude}` 
                                            : <span className="text-gray-400 italic">N/A</span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Additional Notes</h3>
                            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                                {property.notes || <span className="text-gray-400 italic">N/A</span>}
                            </p>
                        </div>

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
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Owner</p>
                                    <div className="mt-1">
                                        {property.owner ? (
                                            <>
                                                <Link
                                                    href={route('contacts.show', property.owner.id)}
                                                    className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium"
                                                >
                                                    {property.owner.company_name || property.owner.contact_person}
                                                </Link>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {property.owner.phone} {property.owner.mobile && `/ ${property.owner.mobile}`}
                                                </p>
                                                <span className="inline-flex mt-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 capitalize">
                                                    {property.owner.type}
                                                </span>
                                            </>
                                        ) : (
                                            <p className="text-gray-400 italic">Not assigned</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.assigned_to ? property.assigned_to.name : <span className="text-gray-400 italic">Not assigned</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.created_by ? property.created_by.name : <span className="text-gray-400 italic">N/A</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">{formatDate(property.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {property.updated_at !== property.created_at 
                                            ? formatDate(property.updated_at) 
                                            : <span className="text-gray-400 italic">Not updated yet</span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
                    {/* Close Button */}
                    <button
                        onClick={closeFullscreen}
                        className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition"
                    >
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    {/* Image */}
                    <div className="relative h-full w-full flex items-center justify-center p-4">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Property ${currentImageIndex + 1}`}
                            className="max-h-full max-w-full object-contain"
                        />
                        
                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition"
                                >
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition"
                                >
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                        
                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </div>
                    
                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-4xl px-4">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`flex-shrink-0 overflow-hidden rounded-lg transition ${
                                        index === currentImageIndex
                                            ? 'ring-2 ring-white'
                                            : 'opacity-50 hover:opacity-100'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="h-16 w-24 object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
