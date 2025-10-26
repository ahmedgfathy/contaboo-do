import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ScrollToTop from '@/Components/ScrollToTop';

export default function Edit({ lead, users, statuses, sources }) {
    const [locale, setLocale] = useState(() => localStorage.getItem('crm_locale') || 'en');

    useEffect(() => {
        const handleStorageChange = () => {
            const newLocale = localStorage.getItem('crm_locale') || 'en';
            setLocale(newLocale);
        };

        const handleLocaleChange = () => {
            const newLocale = localStorage.getItem('crm_locale') || 'en';
            setLocale(newLocale);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('localeChange', handleLocaleChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('localeChange', handleLocaleChange);
        };
    }, []);

    const translations = {
        en: {
            editLead: 'Edit Lead',
            personalInformation: 'Personal Information',
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            mobile: 'Mobile',
            leadRequirements: 'Lead Requirements',
            leadRequirementsLabel: 'Lead Requirements',
            describeRequirements: 'Describe the lead\'s specific requirements...',
            budget: 'Budget',
            propertyType: 'Property Type',
            selectPropertyType: 'Select Property Type',
            apartment: 'Apartment',
            villa: 'Villa',
            shop: 'Shop',
            land: 'Land',
            office: 'Office',
            warehouse: 'Warehouse',
            building: 'Building',
            propertyCategory: 'Property Category',
            selectPropertyCategory: 'Select Property Category',
            residential: 'Residential',
            commercial: 'Commercial',
            industrial: 'Industrial',
            agricultural: 'Agricultural',
            noOfRooms: 'No. of Rooms',
            noOfBathrooms: 'No. of Bathrooms',
            asking: 'Asking',
            selectOption: 'Select Option',
            buy: 'Buy',
            rent: 'Rent',
            companyInformation: 'Company Information',
            company: 'Company',
            jobTitle: 'Job Title',
            leadDetails: 'Lead Details',
            status: 'Status',
            source: 'Source',
            estimatedValue: 'Estimated Value',
            assignTo: 'Assign To',
            unassigned: 'Unassigned',
            lastContactDate: 'Last Contact Date',
            addressInformation: 'Address Information',
            address: 'Address',
            city: 'City',
            state: 'State',
            postalCode: 'Postal Code',
            country: 'Country',
            notes: 'Notes',
            addNotesPlaceholder: 'Add any additional notes about this lead...',
            viewLeadDetails: 'View Lead Details',
            cancel: 'Cancel',
            updating: 'Updating...',
            updateLead: 'Update Lead',
            required: '*'
        },
        ar: {
            editLead: 'تعديل العميل المحتمل',
            personalInformation: 'المعلومات الشخصية',
            firstName: 'الاسم الأول',
            lastName: 'اسم العائلة',
            email: 'البريد الإلكتروني',
            mobile: 'الجوال',
            leadRequirements: 'متطلبات العميل المحتمل',
            leadRequirementsLabel: 'متطلبات العميل المحتمل',
            describeRequirements: 'صف المتطلبات المحددة للعميل المحتمل...',
            budget: 'الميزانية',
            propertyType: 'نوع العقار',
            selectPropertyType: 'اختر نوع العقار',
            apartment: 'شقة',
            villa: 'فيلا',
            shop: 'محل',
            land: 'أرض',
            office: 'مكتب',
            warehouse: 'مخزن',
            building: 'مبنى',
            propertyCategory: 'فئة العقار',
            selectPropertyCategory: 'اختر فئة العقار',
            residential: 'سكني',
            commercial: 'تجاري',
            industrial: 'صناعي',
            agricultural: 'زراعي',
            noOfRooms: 'عدد الغرف',
            noOfBathrooms: 'عدد الحمامات',
            asking: 'مطلوب',
            selectOption: 'اختر',
            buy: 'شراء',
            rent: 'إيجار',
            companyInformation: 'معلومات الشركة',
            company: 'الشركة',
            jobTitle: 'المسمى الوظيفي',
            leadDetails: 'تفاصيل العميل المحتمل',
            status: 'الحالة',
            source: 'المصدر',
            estimatedValue: 'القيمة المقدرة',
            assignTo: 'تعيين إلى',
            unassigned: 'غير معين',
            lastContactDate: 'تاريخ آخر اتصال',
            addressInformation: 'معلومات العنوان',
            address: 'العنوان',
            city: 'المدينة',
            state: 'المحافظة',
            postalCode: 'الرمز البريدي',
            country: 'الدولة',
            notes: 'ملاحظات',
            addNotesPlaceholder: 'أضف أي ملاحظات إضافية عن هذا العميل المحتمل...',
            viewLeadDetails: 'عرض تفاصيل العميل المحتمل',
            cancel: 'إلغاء',
            updating: 'جاري التحديث...',
            updateLead: 'تحديث العميل المحتمل',
            required: '*'
        }
    };

    const t = translations[locale];

    const { data, setData, put, processing, errors } = useForm({
        first_name: lead.first_name || '',
        last_name: lead.last_name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        job_title: lead.job_title || '',
        status: lead.status || 'new',
        source: lead.source || 'website',
        estimated_value: lead.estimated_value || '',
        notes: lead.notes || '',
        address: lead.address || '',
        city: lead.city || '',
        state: lead.state || '',
        country: lead.country || '',
        postal_code: lead.postal_code || '',
        assigned_to: lead.assigned_to || '',
        last_contact_date: lead.last_contact_date ? lead.last_contact_date.split('T')[0] : '',
        requirements: lead.requirements || '',
        budget: lead.budget || '',
        property_type: lead.property_type || '',
        property_category: lead.property_category || '',
        no_of_rooms: lead.no_of_rooms || '',
        no_of_bathrooms: lead.no_of_bathrooms || '',
        asking: lead.asking || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('leads.update', lead.id));
    };

    return (
        <AuthenticatedLayout header={`${t.editLead}: ${lead.full_name}`} backLink={route('leads.show', lead.id)}>
            <Head title={`${t.editLead} - ${lead.full_name}`} />

            <div className="mx-auto max-w-4xl">
                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.personalInformation}</h3>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t.firstName} <span className="text-red-500">{t.required}</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t.lastName}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t.email}
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t.mobile} <span className="text-red-500">{t.required}</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Lead Requirements */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.leadRequirements}</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.leadRequirementsLabel}</label>
                                        <textarea
                                            rows={3}
                                            value={data.requirements}
                                            onChange={(e) => setData('requirements', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            placeholder={t.describeRequirements}
                                        />
                                        {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.budget}</label>
                                            <div className="relative mt-1">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={data.budget}
                                                    onChange={(e) => setData('budget', e.target.value)}
                                                    className="w-full rounded-lg border-gray-300 pl-7 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.propertyType}</label>
                                            <select
                                                value={data.property_type}
                                                onChange={(e) => setData('property_type', e.target.value)}
                                                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">{t.selectPropertyType}</option>
                                                <option value="apartment">{t.apartment}</option>
                                                <option value="villa">{t.villa}</option>
                                                <option value="shop">{t.shop}</option>
                                                <option value="land">{t.land}</option>
                                                <option value="office">{t.office}</option>
                                                <option value="warehouse">{t.warehouse}</option>
                                                <option value="building">{t.building}</option>
                                            </select>
                                            {errors.property_type && <p className="mt-1 text-sm text-red-600">{errors.property_type}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.propertyCategory}</label>
                                            <select
                                                value={data.property_category}
                                                onChange={(e) => setData('property_category', e.target.value)}
                                                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">{t.selectPropertyCategory}</option>
                                                <option value="residential">{t.residential}</option>
                                                <option value="commercial">{t.commercial}</option>
                                                <option value="industrial">{t.industrial}</option>
                                                <option value="agricultural">{t.agricultural}</option>
                                            </select>
                                            {errors.property_category && <p className="mt-1 text-sm text-red-600">{errors.property_category}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.noOfRooms}</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.no_of_rooms}
                                                onChange={(e) => setData('no_of_rooms', e.target.value)}
                                                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="0"
                                            />
                                            {errors.no_of_rooms && <p className="mt-1 text-sm text-red-600">{errors.no_of_rooms}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.noOfBathrooms}</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.no_of_bathrooms}
                                                onChange={(e) => setData('no_of_bathrooms', e.target.value)}
                                                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="0"
                                            />
                                            {errors.no_of_bathrooms && <p className="mt-1 text-sm text-red-600">{errors.no_of_bathrooms}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.asking}</label>
                                            <select
                                                value={data.asking}
                                                onChange={(e) => setData('asking', e.target.value)}
                                                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">{t.selectOption}</option>
                                                <option value="buy">{t.buy}</option>
                                                <option value="rent">{t.rent}</option>
                                            </select>
                                            {errors.asking && <p className="mt-1 text-sm text-red-600">{errors.asking}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Company Information */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.companyInformation}</h3>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.company}</label>
                                        <input
                                            type="text"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.jobTitle}</label>
                                        <input
                                            type="text"
                                            value={data.job_title}
                                            onChange={(e) => setData('job_title', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.job_title && <p className="mt-1 text-sm text-red-600">{errors.job_title}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Lead Details */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.leadDetails}</h3>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t.status}
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            {statuses.map((status) => (
                                                <option key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t.source}
                                        </label>
                                        <select
                                            value={data.source}
                                            onChange={(e) => setData('source', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            {sources.map((source) => (
                                                <option key={source} value={source}>
                                                    {source.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.source && <p className="mt-1 text-sm text-red-600">{errors.source}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.estimatedValue}</label>
                                        <div className="relative mt-1">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={data.estimated_value}
                                                onChange={(e) => setData('estimated_value', e.target.value)}
                                                className="w-full rounded-lg border-gray-300 pl-7 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        {errors.estimated_value && <p className="mt-1 text-sm text-red-600">{errors.estimated_value}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.assignTo}</label>
                                        <select
                                            value={data.assigned_to}
                                            onChange={(e) => setData('assigned_to', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">{t.unassigned}</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.assigned_to && <p className="mt-1 text-sm text-red-600">{errors.assigned_to}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.lastContactDate}</label>
                                        <input
                                            type="date"
                                            value={data.last_contact_date}
                                            onChange={(e) => setData('last_contact_date', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.last_contact_date && <p className="mt-1 text-sm text-red-600">{errors.last_contact_date}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Address Information */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.addressInformation}</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.address}</label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.city}</label>
                                            <input
                                                type="text"
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.state}</label>
                                            <input
                                                type="text"
                                                value={data.state}
                                                onChange={(e) => setData('state', e.target.value)}
                                                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.postalCode}</label>
                                            <input
                                                type="text"
                                                value={data.postal_code}
                                                onChange={(e) => setData('postal_code', e.target.value)}
                                                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                            {errors.postal_code && <p className="mt-1 text-sm text-red-600">{errors.postal_code}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.country}</label>
                                            <input
                                                type="text"
                                                value={data.country}
                                                onChange={(e) => setData('country', e.target.value)}
                                                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.notes}</label>
                                    <textarea
                                        rows={4}
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder={t.addNotesPlaceholder}
                                    />
                                    {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                            <Link
                                href={route('leads.show', lead.id)}
                                className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                            >
                                {locale === 'ar' ? '→' : '←'} {t.viewLeadDetails}
                            </Link>
                            <div className="flex gap-4">
                                <Link
                                    href={route('leads.index')}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    {t.cancel}
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <svg className={`h-4 w-4 animate-spin ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {t.updating}
                                        </>
                                    ) : (
                                        <>
                                            <svg className={`h-5 w-5 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {t.updateLead}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ScrollToTop />
        </AuthenticatedLayout>
    );
}
