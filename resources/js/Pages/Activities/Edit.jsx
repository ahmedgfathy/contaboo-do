import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function EditOpportunity({ activity, users, types, statuses, listing_types }) {
    const { data, setData, post, processing, errors } = useForm({
        title: activity.title || '',
        description: activity.description || '',
        type: activity.type || 'apartment',
        status: activity.status || 'available',
        listing_type: activity.listing_type || 'sale',
        price: activity.price || '',
        area: activity.area || '',
        bedrooms: activity.bedrooms || '',
        bathrooms: activity.bathrooms || '',
        parking_spaces: activity.parking_spaces || '',
        floor_number: activity.floor_number || '',
        total_floors: activity.total_floors || '',
        year_built: activity.year_built || '',
        furnished: activity.furnished || false,
        amenities: activity.amenities || [],
        activity_images: [],
        existing_images: activity.images || [],
        address: activity.address || '',
        city: activity.city || '',
        state: activity.state || '',
        country: activity.country || '',
        postal_code: activity.postal_code || '',
        latitude: activity.latitude || '',
        longitude: activity.longitude || '',
        reference_number: activity.reference_number || '',
        notes: activity.notes || '',
        assigned_to: activity.assigned_to || '',
        _method: 'PUT',
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const amenitiesOptions = [
        'Pool', 'Gym', 'Security', 'Parking', 'Garden', 'Balcony', 
        'Elevator', 'AC', 'Heating', 'Internet', 'Furnished', 'Pet Friendly'
    ];

    const handleAmenityToggle = (amenity) => {
        if (data.amenities.includes(amenity)) {
            setData('amenities', data.amenities.filter(a => a !== amenity));
        } else {
            setData('amenities', [...data.amenities, amenity]);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('activity_images', files);

        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeNewImage = (index) => {
        const newImages = [...data.activity_images];
        newImages.splice(index, 1);
        setData('activity_images', newImages);

        const newPreviews = [...imagePreviews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
    };

    const removeExistingImage = (index) => {
        const newExisting = [...data.existing_images];
        newExisting.splice(index, 1);
        setData('existing_images', newExisting);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('activities.update', activity.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout header="Edit Property">
            <Head title="Edit Property" />

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
                        href={route('activities.show', activity.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                    >
                        View Property Details →
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., Luxury 3BR Apartment in Downtown"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Reference Number
                                </label>
                                <input
                                    type="text"
                                    value={data.reference_number}
                                    onChange={(e) => setData('reference_number', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., PROP-2025-001"
                                />
                                {errors.reference_number && <p className="mt-1 text-sm text-red-600">{errors.reference_number}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Detailed description of the activity..."
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Property Details</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Listing Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.listing_type}
                                    onChange={(e) => setData('listing_type', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    {listing_types.map((lt) => (
                                        <option key={lt} value={lt}>
                                            {lt.charAt(0).toUpperCase() + lt.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.listing_type && <p className="mt-1 text-sm text-red-600">{errors.listing_type}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 pl-7 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Area (m²)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.area}
                                    onChange={(e) => setData('area', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="0.00"
                                />
                                {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Assigned To
                                </label>
                                <select
                                    value={data.assigned_to}
                                    onChange={(e) => setData('assigned_to', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Unassigned</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.assigned_to && <p className="mt-1 text-sm text-red-600">{errors.assigned_to}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Rooms & Spaces */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Rooms & Spaces</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Bedrooms
                                </label>
                                <input
                                    type="number"
                                    value={data.bedrooms}
                                    onChange={(e) => setData('bedrooms', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="0"
                                />
                                {errors.bedrooms && <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Bathrooms
                                </label>
                                <input
                                    type="number"
                                    value={data.bathrooms}
                                    onChange={(e) => setData('bathrooms', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="0"
                                />
                                {errors.bathrooms && <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Parking Spaces
                                </label>
                                <input
                                    type="number"
                                    value={data.parking_spaces}
                                    onChange={(e) => setData('parking_spaces', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="0"
                                />
                                {errors.parking_spaces && <p className="mt-1 text-sm text-red-600">{errors.parking_spaces}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Year Built
                                </label>
                                <input
                                    type="number"
                                    value={data.year_built}
                                    onChange={(e) => setData('year_built', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="2024"
                                />
                                {errors.year_built && <p className="mt-1 text-sm text-red-600">{errors.year_built}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Floor Number
                                </label>
                                <input
                                    type="number"
                                    value={data.floor_number}
                                    onChange={(e) => setData('floor_number', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="0"
                                />
                                {errors.floor_number && <p className="mt-1 text-sm text-red-600">{errors.floor_number}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Total Floors
                                </label>
                                <input
                                    type="number"
                                    value={data.total_floors}
                                    onChange={(e) => setData('total_floors', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="0"
                                />
                                {errors.total_floors && <p className="mt-1 text-sm text-red-600">{errors.total_floors}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.furnished}
                                        onChange={(e) => setData('furnished', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Furnished</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Amenities</h3>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {amenitiesOptions.map((amenity) => (
                                <label key={amenity} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.amenities.includes(amenity)}
                                        onChange={() => handleAmenityToggle(amenity)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Property Images & Videos</h3>
                        <div className="space-y-4">
                            {/* Existing Images */}
                            {data.existing_images.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Current Images ({data.existing_images.length})
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {data.existing_images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <div className="relative h-32 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                                                    <img
                                                        src={`/storage/${image}`}
                                                        alt={`Property ${index + 1}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                    {index === 0 && (
                                                        <div className="absolute top-2 left-2">
                                                            <span className="inline-flex items-center rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">
                                                                <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                Cover
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                                    title="Remove image"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add New Images */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Add New Images (Max 5MB each, JPEG/PNG/WebP/GIF)
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PNG, JPG, WEBP, GIF up to 5MB
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {errors.activity_images && <p className="mt-1 text-sm text-red-600">{errors.activity_images}</p>}
                            </div>

                            {/* New Images Preview */}
                            {imagePreviews.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        New Images to Add ({imagePreviews.length})
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <div className="relative h-32 rounded-lg overflow-hidden border-2 border-green-500 dark:border-green-400">
                                                    <img
                                                        src={preview}
                                                        alt={`New ${index + 1}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                    <div className="absolute top-2 left-2">
                                                        <span className="inline-flex items-center rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                                                            New
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                                    title="Remove image"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Street address"
                                />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="City"
                                />
                                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    State/Province
                                </label>
                                <input
                                    type="text"
                                    value={data.state}
                                    onChange={(e) => setData('state', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="State/Province"
                                />
                                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Country"
                                />
                                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    value={data.postal_code}
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Postal code"
                                />
                                {errors.postal_code && <p className="mt-1 text-sm text-red-600">{errors.postal_code}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    step="0.00000001"
                                    value={data.latitude}
                                    onChange={(e) => setData('latitude', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="0.00000000"
                                />
                                {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    step="0.00000001"
                                    value={data.longitude}
                                    onChange={(e) => setData('longitude', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="0.00000000"
                                />
                                {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Additional Notes</h3>
                        <textarea
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Any additional information about the activity..."
                        />
                        {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href={route('activities.index')}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Update Property
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
