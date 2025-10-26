import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CustomFilterModal from '@/Components/CustomFilterModal';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function PropertiesIndex({ properties, users, filters, types, statuses, listing_types, stats, savedFilters, availableColumns }) {
    const [locale, setLocale] = useState(() => localStorage.getItem('crm_locale') || 'en');
    
    useEffect(() => {
        const handleLocaleChange = () => {
            const newLocale = localStorage.getItem('crm_locale') || 'en';
            setLocale(newLocale);
        };
        window.addEventListener('localeChange', handleLocaleChange);
        window.addEventListener('storage', handleLocaleChange);
        return () => {
            window.removeEventListener('localeChange', handleLocaleChange);
            window.removeEventListener('storage', handleLocaleChange);
        };
    }, []);

    const translations = {
        en: {
            properties: 'Properties',
            addNew: 'Add New Property',
            import: 'Import',
            export: 'Export',
            filters: 'Filters',
            saveFilter: 'Save Filter',
            savedFilters: 'Saved Filters',
            customize: 'Customize',
            reset: 'Reset',
            search: 'Search properties...',
            type: 'Type',
            status: 'Status',
            listingType: 'Listing Type',
            assignedTo: 'Assigned To',
            priceMin: 'Min Price',
            priceMax: 'Max Price',
            bedrooms: 'Bedrooms',
            dateFrom: 'Date From',
            dateTo: 'Date To',
            allTypes: 'All Types',
            allStatuses: 'All Statuses',
            allListingTypes: 'All Listing Types',
            allUsers: 'All Users',
            totalProperties: 'Total Properties',
            availableProperties: 'Available',
            soldProperties: 'Sold',
            rentedProperties: 'Rented',
            title: 'Title',
            price: 'Price',
            area: 'Area',
            owner: 'Owner',
            actions: 'Actions',
            view: 'View',
            edit: 'Edit',
            delete: 'Delete',
            confirmDelete: 'Are you sure you want to delete this property?',
            importProperties: 'Import Properties',
            selectFile: 'Select CSV File',
            cancel: 'Cancel',
            uploadFile: 'Upload File',
            listView: 'List View',
            gridView: 'Grid View',
            apartment: 'Apartment',
            villa: 'Villa',
            office: 'Office',
            land: 'Land',
            warehouse: 'Warehouse',
            shop: 'Shop',
            other: 'Other',
            available: 'Available',
            sold: 'Sold',
            rented: 'Rented',
            pending: 'Pending',
            sale: 'For Sale',
            rent: 'For Rent',
            sqm: 'sqm',
            bed: 'Bed',
            bath: 'Bath',
            parking: 'Parking',
            confirmDeleteFilter: 'Are you sure you want to delete this filter?',
        },
        ar: {
            properties: 'العقارات',
            addNew: 'إضافة عقار جديد',
            import: 'استيراد',
            export: 'تصدير',
            filters: 'الفلاتر',
            saveFilter: 'حفظ الفلتر',
            savedFilters: 'الفلاتر المحفوظة',
            customize: 'تخصيص',
            reset: 'إعادة تعيين',
            search: 'البحث عن عقارات...',
            type: 'النوع',
            status: 'الحالة',
            listingType: 'نوع الإعلان',
            assignedTo: 'مسند إلى',
            priceMin: 'الحد الأدنى للسعر',
            priceMax: 'الحد الأقصى للسعر',
            bedrooms: 'غرف النوم',
            dateFrom: 'من تاريخ',
            dateTo: 'إلى تاريخ',
            allTypes: 'جميع الأنواع',
            allStatuses: 'جميع الحالات',
            allListingTypes: 'جميع أنواع الإعلانات',
            allUsers: 'جميع المستخدمين',
            totalProperties: 'إجمالي العقارات',
            availableProperties: 'متاحة',
            soldProperties: 'مباعة',
            rentedProperties: 'مؤجرة',
            title: 'العنوان',
            price: 'السعر',
            area: 'المساحة',
            owner: 'المالك',
            actions: 'الإجراءات',
            view: 'عرض',
            edit: 'تعديل',
            delete: 'حذف',
            confirmDelete: 'هل أنت متأكد من حذف هذا العقار؟',
            importProperties: 'استيراد العقارات',
            selectFile: 'اختر ملف CSV',
            cancel: 'إلغاء',
            uploadFile: 'رفع الملف',
            listView: 'عرض القائمة',
            gridView: 'عرض الشبكة',
            apartment: 'شقة',
            villa: 'فيلا',
            office: 'مكتب',
            land: 'أرض',
            warehouse: 'مستودع',
            shop: 'محل',
            other: 'آخر',
            available: 'متاح',
            sold: 'مباع',
            rented: 'مؤجر',
            pending: 'قيد الانتظار',
            sale: 'للبيع',
            rent: 'للإيجار',
            sqm: 'م²',
            bed: 'غرفة',
            bath: 'حمام',
            parking: 'مواقف',
            confirmDeleteFilter: 'هل أنت متأكد من حذف هذا الفلتر؟',
        },
    };

    const t = translations[locale];

    const [showFilters, setShowFilters] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [editingFilter, setEditingFilter] = useState(null);
    const [visibleColumns, setVisibleColumns] = useState([]);
    // Load view preference from localStorage, default to 'list'
    const [viewMode, setViewMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('propertiesViewMode') || 'list';
        }
        return 'list';
    });

    // Save view preference when it changes
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('propertiesViewMode', mode);
        }
    };

    const searchForm = useForm({
        search: filters.search || '',
        type: filters.type || '',
        status: filters.status || '',
        listing_type: filters.listing_type || '',
        assigned_to: filters.assigned_to || '',
        price_min: filters.price_min || '',
        price_max: filters.price_max || '',
        bedrooms: filters.bedrooms || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    // Auto-submit search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(route('properties.index'), searchForm.data, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchForm.data.search]);

    // Auto-submit filters immediately when changed
    useEffect(() => {
        if (filters.type !== undefined || filters.status !== undefined || filters.listing_type !== undefined || filters.assigned_to !== undefined || filters.price_min !== undefined || filters.price_max !== undefined || filters.bedrooms !== undefined || filters.date_from !== undefined || filters.date_to !== undefined) {
            router.get(route('properties.index'), searchForm.data, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [searchForm.data.type, searchForm.data.status, searchForm.data.listing_type, searchForm.data.assigned_to, searchForm.data.price_min, searchForm.data.price_max, searchForm.data.bedrooms, searchForm.data.date_from, searchForm.data.date_to]);

    const handleReset = () => {
        searchForm.reset();
        router.get(route('properties.index'), {}, {
            preserveState: false,
            preserveScroll: false,
        });
    };

    const handleApplyFilter = (filter) => {
        setSelectedFilter(filter);
        if (filter.columns && filter.columns.length > 0) {
            setVisibleColumns(filter.columns);
        }
        if (filter.conditions && filter.conditions.length > 0) {
            const newFilterData = { ...searchForm.data };
            filter.conditions.forEach(condition => {
                newFilterData[condition.field] = condition.value;
            });
            router.get(route('properties.index'), newFilterData, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const handleDeleteFilter = async (filterId) => {
        if (confirm('Are you sure you want to delete this filter?')) {
            try {
                await axios.delete(route('saved-filters.destroy', filterId));
                router.reload();
            } catch (error) {
                console.error('Error deleting filter:', error);
                alert('Error deleting filter. Please try again.');
            }
        }
    };

    const handleEditFilter = (filter) => {
        setEditingFilter(filter);
        setShowFilterModal(true);
    };

    const isColumnVisible = (columnValue) => {
        if (visibleColumns.length === 0) return true;
        return visibleColumns.includes(columnValue);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this property?')) {
            router.delete(route('properties.destroy', id));
        }
    };

    const handleExport = () => {
        router.post(route('properties.export'), searchForm.data, {
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

        router.post(route('properties.import'), formData, {
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
        const typeMap = {
            apartment: t.apartment,
            villa: t.villa,
            office: t.office,
            land: t.land,
            warehouse: t.warehouse,
            shop: t.shop,
            other: t.other,
        };
        return typeMap[type] || type;
    };

    const getStatusLabel = (status) => {
        const statusMap = {
            available: t.available,
            sold: t.sold,
            rented: t.rented,
            pending: t.pending,
        };
        return statusMap[status] || status;
    };

    const getListingTypeLabel = (listingType) => {
        const listingTypeMap = {
            sale: t.sale,
            rent: t.rent,
        };
        return listingTypeMap[listingType] || listingType;
    };

    const getListingTypeColor = (listingType) => {
        return listingType === 'sale' 
            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    };

    return (
        <AuthenticatedLayout header={t.properties}>
            <Head title={t.properties} />

            <div className="space-y-6">
                {/* Statistics Cards */}
                {stats && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Total Properties Card */}
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={locale === 'ar' ? 'mr-5 w-0 flex-1' : 'ml-5 w-0 flex-1'}>
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{t.totalProperties}</dt>
                                            <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{stats.total_properties}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* For Sale Card */}
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-500">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={locale === 'ar' ? 'mr-5 w-0 flex-1' : 'ml-5 w-0 flex-1'}>
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{t.sale}</dt>
                                            <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{stats.for_sale}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* For Rent Card */}
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-purple-500">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={locale === 'ar' ? 'mr-5 w-0 flex-1' : 'ml-5 w-0 flex-1'}>
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{t.rent}</dt>
                                            <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{stats.for_rent}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sold Card */}
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-500">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={locale === 'ar' ? 'mr-5 w-0 flex-1' : 'ml-5 w-0 flex-1'}>
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{t.sold}</dt>
                                            <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{stats.sold}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header Actions */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Link
                            href={route('properties.create')}
                            className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700"
                        >
                            <svg className={locale === 'ar' ? 'ml-2 h-5 w-5' : 'mr-2 h-5 w-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {t.addNew}
                        </Link>
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            <svg className={locale === 'ar' ? 'ml-2 h-5 w-5' : 'mr-2 h-5 w-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            {t.import}
                        </button>
                        <button
                            onClick={handleExport}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            <svg className={locale === 'ar' ? 'ml-2 h-5 w-5' : 'mr-2 h-5 w-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {t.export}
                        </button>

                        {/* Custom Filters Section */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {t.filters}:
                            </label>
                            <select
                                value={selectedFilter?.id || ''}
                                onChange={(e) => {
                                    const filter = savedFilters.find(f => f.id === parseInt(e.target.value));
                                    if (filter) {
                                        handleApplyFilter(filter);
                                    } else {
                                        setSelectedFilter(null);
                                        setVisibleColumns([]);
                                        router.get(route('properties.index'), {}, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }
                                }}
                                className="rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All (No Filter)</option>
                                {savedFilters.map((filter) => (
                                    <option key={filter.id} value={filter.id}>
                                        {filter.name} {filter.is_public ? '(Public)' : '(Private)'}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => {
                                    setEditingFilter(null);
                                    setShowFilterModal(true);
                                }}
                                className="inline-flex items-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                title="Create Filter"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                            {selectedFilter && (
                                <>
                                    <button
                                        onClick={() => handleEditFilter(selectedFilter)}
                                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        title="Edit Filter"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteFilter(selectedFilter.id)}
                                        className="inline-flex items-center rounded-lg border border-red-300 bg-white p-2 text-red-700 shadow-sm hover:bg-red-50 dark:border-red-600 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-900/20"
                                        title="Delete Filter"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 p-1 dark:border-gray-600 flex-shrink-0">
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
                            {/* Search Bar */}
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
                                    {(filters.search || filters.type || filters.status || filters.listing_type || filters.assigned_to || filters.price_min || filters.price_max || filters.bedrooms || filters.date_from || filters.date_to) && (
                                        <span className="ml-2 inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                                            Active
                                        </span>
                                    )}
                                </button>
                                {(filters.search || filters.type || filters.status || filters.listing_type || filters.assigned_to || filters.price_min || filters.price_max || filters.bedrooms || filters.date_from || filters.date_to) && (
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
                                            value={searchForm.data.listing_type}
                                            onChange={(e) => searchForm.setData('listing_type', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">All Listing Types</option>
                                            {listing_types.map((lt) => (
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
                                            value={searchForm.data.price_min}
                                            onChange={(e) => searchForm.setData('price_min', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Price</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={searchForm.data.price_max}
                                            onChange={(e) => searchForm.setData('price_max', e.target.value)}
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

                {/* Properties List/Card View */}
                {viewMode === 'list' ? (
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    {isColumnVisible('title') && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Property
                                        </th>
                                    )}
                                    {isColumnVisible('type') && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Type
                                        </th>
                                    )}
                                    {isColumnVisible('status') && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                    )}
                                    {isColumnVisible('listing_type') && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Listing
                                        </th>
                                    )}
                                    {(isColumnVisible('city') || isColumnVisible('country')) && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Location
                                        </th>
                                    )}
                                    {(isColumnVisible('bedrooms') || isColumnVisible('bathrooms') || isColumnVisible('area')) && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Details
                                        </th>
                                    )}
                                    {isColumnVisible('price') && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Price
                                        </th>
                                    )}
                                    {isColumnVisible('assigned_to') && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Assigned To
                                        </th>
                                    )}
                                    {isColumnVisible('reference_number') && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Reference
                                        </th>
                                    )}
                                    {isColumnVisible('created_at') && (
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Created
                                        </th>
                                    )}
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {properties.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="20" className="px-6 py-12 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No properties found. Create your first property!</p>
                                        </td>
                                    </tr>
                                ) : (
                                    properties.data.map((property) => (
                                        <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            {isColumnVisible('title') && (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {property.title}
                                                    </div>
                                                    {property.reference_number && !isColumnVisible('reference_number') && (
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            Ref: {property.reference_number}
                                                        </div>
                                                    )}
                                                </td>
                                            )}
                                            {isColumnVisible('type') && (
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                    {getTypeLabel(property.type)}
                                                </td>
                                            )}
                                            {isColumnVisible('status') && (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(property.status)}`}>
                                                        {property.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                    </span>
                                                </td>
                                            )}
                                            {isColumnVisible('listing_type') && (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getListingTypeColor(property.listing_type)}`}>
                                                        {property.listing_type.charAt(0).toUpperCase() + property.listing_type.slice(1)}
                                                    </span>
                                                </td>
                                            )}
                                            {(isColumnVisible('city') || isColumnVisible('country')) && (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {isColumnVisible('city') && <div className="text-sm text-gray-900 dark:text-white">{property.city}</div>}
                                                    {isColumnVisible('country') && <div className="text-sm text-gray-500 dark:text-gray-400">{property.country}</div>}
                                                </td>
                                            )}
                                            {(isColumnVisible('bedrooms') || isColumnVisible('bathrooms') || isColumnVisible('area')) && (
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {isColumnVisible('bedrooms') && property.bedrooms && `${property.bedrooms} bed`}
                                                    {isColumnVisible('bedrooms') && property.bedrooms && isColumnVisible('bathrooms') && property.bathrooms && ' • '}
                                                    {isColumnVisible('bathrooms') && property.bathrooms && `${property.bathrooms} bath`}
                                                    {((isColumnVisible('bedrooms') && property.bedrooms) || (isColumnVisible('bathrooms') && property.bathrooms)) && isColumnVisible('area') && property.area && ' • '}
                                                    {isColumnVisible('area') && property.area && `${property.area} m²`}
                                                </td>
                                            )}
                                            {isColumnVisible('price') && (
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                                                    ${parseFloat(property.price).toLocaleString()}
                                                </td>
                                            )}
                                            {isColumnVisible('assigned_to') && (
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                    {property.assigned_to?.name || 'Unassigned'}
                                                </td>
                                            )}
                                            {isColumnVisible('reference_number') && (
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {property.reference_number || '-'}
                                                </td>
                                            )}
                                            {isColumnVisible('created_at') && (
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(property.created_at).toLocaleDateString()}
                                                </td>
                                            )}
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('properties.show', property.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        title="View"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </Link>
                                                    <Link
                                                        href={route('properties.edit', property.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        title="Edit"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(property.id)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        title="Delete"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
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
                    {properties.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                {properties.prev_page_url && (
                                    <Link
                                        href={properties.prev_page_url}
                                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {properties.next_page_url && (
                                    <Link
                                        href={properties.next_page_url}
                                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing <span className="font-medium">{properties.from}</span> to <span className="font-medium">{properties.to}</span> of{' '}
                                        <span className="font-medium">{properties.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                        {properties.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-indigo-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                    index === properties.links.length - 1 ? 'rounded-r-md' : ''
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
                        {properties.data.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No properties found. Create your first property!</p>
                            </div>
                        ) : (
                            properties.data.map((property) => (
                                <div key={property.id} className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg dark:bg-gray-800">
                                    {/* Property Image */}
                                    <Link href={route('properties.show', property.id)} className="block">
                                        <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden group">
                                            {property.images && property.images.length > 0 ? (
                                                <img
                                                    src={property.images[0]}
                                                    alt={property.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '';
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = `
                                                            <div class="flex h-full items-center justify-center">
                                                                <svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                                </svg>
                                                            </div>
                                                        `;
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3 flex gap-2">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(property.status)}`}>
                                                    {property.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                </span>
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getListingTypeColor(property.listing_type)}`}>
                                                    {property.listing_type.charAt(0).toUpperCase() + property.listing_type.slice(1)}
                                                </span>
                                            </div>
                                            {property.images && property.images.length > 1 && (
                                                <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
                                                    <svg className="inline h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {property.images.length}
                                                </div>
                                            )}
                                        </div>
                                    </Link>

                                    {/* Property Details */}
                                    <div className="p-5">
                                        <div className="mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {property.title}
                                            </h3>
                                            {property.reference_number && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Ref: {property.reference_number}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {property.city}, {property.country}
                                        </div>

                                        <div className="mb-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            {property.bedrooms && (
                                                <span className="flex items-center">
                                                    <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    {property.bedrooms} bed
                                                </span>
                                            )}
                                            {property.bathrooms && (
                                                <span className="flex items-center">
                                                    <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {property.bathrooms} bath
                                                </span>
                                            )}
                                            {property.area && (
                                                <span className="flex items-center">
                                                    <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                    </svg>
                                                    {property.area} m²
                                                </span>
                                            )}
                                        </div>

                                        <div className="mb-4 border-t border-gray-200 pt-3 dark:border-gray-700">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
                                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                                    ${parseFloat(property.price).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Link
                                                href={route('properties.show', property.id)}
                                                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                                                title="View Details"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View
                                            </Link>
                                            <Link
                                                href={route('properties.edit', property.id)}
                                                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                                title="Edit"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
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
                {properties.links.length > 3 && (
                    <div className="flex items-center justify-between rounded-lg border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            {properties.prev_page_url && (
                                <Link
                                    href={properties.prev_page_url}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {properties.next_page_url && (
                                <Link
                                    href={properties.next_page_url}
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing <span className="font-medium">{properties.from}</span> to <span className="font-medium">{properties.to}</span> of{' '}
                                    <span className="font-medium">{properties.total}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    {properties.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                link.active
                                                    ? 'z-10 bg-indigo-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                index === properties.links.length - 1 ? 'rounded-r-md' : ''
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
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Import Properties</h3>
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

            {/* Custom Filter Modal */}
            <CustomFilterModal
                show={showFilterModal}
                onClose={() => {
                    setShowFilterModal(false);
                    setEditingFilter(null);
                }}
                types={types}
                statuses={statuses}
                listingTypes={listing_types}
                users={users}
                availableColumns={availableColumns}
                editingFilter={editingFilter}
                module="properties"
            />
        </AuthenticatedLayout>
    );
}
