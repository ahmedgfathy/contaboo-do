import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ScrollToTop from '@/Components/ScrollToTop';

export default function CreateContact({ types }) {
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
            createContact: 'Create New Contact',
            backToContacts: 'Back to Contacts',
            basicInformation: 'Basic Information',
            companyName: 'Company Name',
            companyNamePlaceholder: 'e.g., ABC Company Ltd.',
            contactPerson: 'Contact Person',
            contactPersonPlaceholder: 'e.g., John Smith',
            type: 'Type',
            client: 'Client',
            partner: 'Partner',
            vendor: 'Vendor',
            other: 'Other',
            status: 'Status',
            active: 'Active',
            inactive: 'Inactive',
            contactInformation: 'Contact Information',
            email: 'Email',
            emailPlaceholder: 'e.g., contact@company.com',
            phone: 'Phone',
            phonePlaceholder: 'e.g., +1 234 567 8900',
            mobile: 'Mobile',
            mobilePlaceholder: 'e.g., +1 234 567 8901',
            website: 'Website',
            websitePlaceholder: 'e.g., https://www.company.com',
            addressInformation: 'Address Information',
            address: 'Address',
            addressPlaceholder: 'Street address',
            city: 'City',
            cityPlaceholder: 'e.g., New York',
            state: 'State/Province',
            statePlaceholder: 'e.g., NY',
            country: 'Country',
            countryPlaceholder: 'e.g., United States',
            postalCode: 'Postal Code',
            postalCodePlaceholder: 'e.g., 10001',
            additionalInformation: 'Additional Information',
            notes: 'Notes',
            notesPlaceholder: 'Any additional notes...',
            cancel: 'Cancel',
            createButton: 'Create Contact',
        },
        ar: {
            createContact: 'إنشاء جهة اتصال جديدة',
            backToContacts: 'العودة لجهات الاتصال',
            basicInformation: 'المعلومات الأساسية',
            companyName: 'اسم الشركة',
            companyNamePlaceholder: 'مثال: شركة ABC المحدودة',
            contactPerson: 'جهة الاتصال',
            contactPersonPlaceholder: 'مثال: أحمد محمد',
            type: 'النوع',
            client: 'عميل',
            partner: 'شريك',
            vendor: 'مورد',
            other: 'آخر',
            status: 'الحالة',
            active: 'نشط',
            inactive: 'غير نشط',
            contactInformation: 'معلومات الاتصال',
            email: 'البريد الإلكتروني',
            emailPlaceholder: 'مثال: contact@company.com',
            phone: 'الهاتف',
            phonePlaceholder: 'مثال: +20 123 456 7890',
            mobile: 'الجوال',
            mobilePlaceholder: 'مثال: +20 123 456 7891',
            website: 'الموقع الإلكتروني',
            websitePlaceholder: 'مثال: https://www.company.com',
            addressInformation: 'معلومات العنوان',
            address: 'العنوان',
            addressPlaceholder: 'عنوان الشارع',
            city: 'المدينة',
            cityPlaceholder: 'مثال: القاهرة',
            state: 'المحافظة/الولاية',
            statePlaceholder: 'مثال: القاهرة',
            country: 'الدولة',
            countryPlaceholder: 'مثال: مصر',
            postalCode: 'الرمز البريدي',
            postalCodePlaceholder: 'مثال: 11511',
            additionalInformation: 'معلومات إضافية',
            notes: 'ملاحظات',
            notesPlaceholder: 'أي ملاحظات أو تعليقات إضافية...',
            cancel: 'إلغاء',
            createButton: 'إنشاء جهة الاتصال',
        },
    };

    const t = translations[locale];

    const { data, setData, post, processing, errors } = useForm({
        type: 'client',
        company_name: '',
        contact_person: '',
        email: '',
        phone: '',
        mobile: '',
        website: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        status: 'active',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contacts.store'));
    };

    return (
        <AuthenticatedLayout header={t.createContact}>
            <Head title={t.createContact} />
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <Link href={route('contacts.index')} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <svg className={locale === 'ar' ? 'ml-2 h-4 w-4' : 'mr-2 h-4 w-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t.backToContacts}
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t.basicInformation}</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.companyName} <span className="text-red-500">*</span></label>
                                <input type="text" value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.companyNamePlaceholder} required />
                                {errors.company_name && <p className="mt-1 text-sm text-red-600">{errors.company_name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.contactPerson}</label>
                                <input type="text" value={data.contact_person} onChange={(e) => setData('contact_person', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.contactPersonPlaceholder} />
                                {errors.contact_person && <p className="mt-1 text-sm text-red-600">{errors.contact_person}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.type} <span className="text-red-500">*</span></label>
                                <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
                                    <option value="client">{t.client}</option>
                                    <option value="partner">{t.partner}</option>
                                    <option value="vendor">{t.vendor}</option>
                                    <option value="other">{t.other}</option>
                                </select>
                                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.status}</label>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                    <option value="active">{t.active}</option>
                                    <option value="inactive">{t.inactive}</option>
                                </select>
                                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t.contactInformation}</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.email}</label>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.emailPlaceholder} />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.phone}</label>
                                <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.phonePlaceholder} />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.mobile}</label>
                                <input type="tel" value={data.mobile} onChange={(e) => setData('mobile', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.mobilePlaceholder} />
                                {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.website}</label>
                                <input type="url" value={data.website} onChange={(e) => setData('website', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.websitePlaceholder} />
                                {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t.addressInformation}</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.address}</label>
                                <textarea value={data.address} onChange={(e) => setData('address', e.target.value)} rows={2} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.addressPlaceholder} />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.city}</label>
                                    <input type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.cityPlaceholder} />
                                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.state}</label>
                                    <input type="text" value={data.state} onChange={(e) => setData('state', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.statePlaceholder} />
                                    {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.country}</label>
                                    <input type="text" value={data.country} onChange={(e) => setData('country', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.countryPlaceholder} />
                                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.postalCode}</label>
                                    <input type="text" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.postalCodePlaceholder} />
                                    {errors.postal_code && <p className="mt-1 text-sm text-red-600">{errors.postal_code}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t.additionalInformation}</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.notes}</label>
                            <textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={4} className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder={t.notesPlaceholder} />
                            {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <Link href={route('contacts.index')} className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">{t.cancel}</Link>
                        <button type="submit" disabled={processing} className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{t.createButton}</button>
                    </div>
                </form>
            </div>
            <ScrollToTop />
        </AuthenticatedLayout>
    );
}
