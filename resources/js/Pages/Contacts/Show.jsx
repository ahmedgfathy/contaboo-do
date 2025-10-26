import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ScrollToTop from '@/Components/ScrollToTop';
import { useState, useEffect } from 'react';

export default function ShowContact({ contact }) {
    // Locale management
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

    // Translations
    const translations = {
        en: {
            contactDetails: 'Contact Details',
            backToContacts: 'Back to Contacts',
            viewOriginalLead: 'View Original Lead',
            editContact: 'Edit Contact',
            contactLabel: 'Contact',
            contactInformation: 'Contact Information',
            address: 'Address',
            notes: 'Notes',
            briefHistory: 'Brief History',
            created: 'Created',
            by: 'By',
            lastModified: 'Last Modified',
            viewFullActivityHistory: 'View Full Activity History',
            createdBy: 'Created By',
            createdAt: 'Created At',
            lastUpdated: 'Last Updated',
            notSet: 'Not set',
            client: 'Client',
            partner: 'Partner',
            vendor: 'Vendor',
            other: 'Other',
            active: 'Active',
            inactive: 'Inactive',
        },
        ar: {
            contactDetails: 'تفاصيل جهة الاتصال',
            backToContacts: 'العودة لجهات الاتصال',
            viewOriginalLead: 'عرض العميل المحتمل الأصلي',
            editContact: 'تعديل جهة الاتصال',
            contactLabel: 'جهة الاتصال',
            contactInformation: 'معلومات الاتصال',
            address: 'العنوان',
            notes: 'ملاحظات',
            briefHistory: 'نبذة تاريخية',
            created: 'تم الإنشاء',
            by: 'بواسطة',
            lastModified: 'آخر تعديل',
            viewFullActivityHistory: 'عرض سجل النشاط الكامل',
            createdBy: 'أنشئ بواسطة',
            createdAt: 'تاريخ الإنشاء',
            lastUpdated: 'آخر تحديث',
            notSet: 'غير محدد',
            client: 'عميل',
            partner: 'شريك',
            vendor: 'مورد',
            other: 'آخر',
            active: 'نشط',
            inactive: 'غير نشط',
        },
    };

    const t = translations[locale];

    const formatDate = (dateString) => {
        if (!dateString) return t.notSet;
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
    };

    const getTypeLabel = (type) => {
        const labels = {
            client: t.client,
            partner: t.partner,
            vendor: t.vendor,
            other: t.other,
        };
        return labels[type.toLowerCase()] || type.charAt(0).toUpperCase() + type.slice(1);
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

    const getStatusLabel = (status) => {
        return status === 'active' ? t.active : t.inactive;
    };

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            inactive: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[status] || colors.active;
    };

    return (
        <AuthenticatedLayout header={t.contactDetails}>
            <Head title={contact.company_name} />

            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href={route('contacts.index')}
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <svg className={locale === 'ar' ? 'ml-2 h-4 w-4' : 'mr-2 h-4 w-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t.backToContacts}
                    </Link>
                    <div className="flex gap-3">
                        {contact.original_lead_id && (
                            <Link
                                href={route('leads.show', contact.original_lead_id)}
                                className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                            >
                                <svg className={locale === 'ar' ? 'ml-2 h-4 w-4' : 'mr-2 h-4 w-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {t.viewOriginalLead}
                            </Link>
                        )}
                        <Link
                            href={route('contacts.edit', contact.id)}
                            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            <svg className={locale === 'ar' ? 'ml-2 h-4 w-4' : 'mr-2 h-4 w-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            {t.editContact}
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
                                            {t.contactLabel}: {contact.contact_person}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getTypeColor(contact.type)}`}>
                                        {getTypeLabel(contact.type)}
                                    </span>
                                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(contact.status)}`}>
                                        {getStatusLabel(contact.status)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t.contactInformation}</h3>
                            <div className="space-y-3">
                                {contact.email && (
                                    <div className="flex items-center">
                                        <svg className={locale === 'ar' ? 'ml-3 h-5 w-5 text-gray-400' : 'mr-3 h-5 w-5 text-gray-400'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                            {contact.email}
                                        </a>
                                    </div>
                                )}
                                {contact.phone && (
                                    <div className="flex items-center">
                                        <svg className={locale === 'ar' ? 'ml-3 h-5 w-5 text-gray-400' : 'mr-3 h-5 w-5 text-gray-400'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <a href={`tel:${contact.phone}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                            {contact.phone}
                                        </a>
                                    </div>
                                )}
                                {contact.mobile && (
                                    <div className="flex items-center">
                                        <svg className={locale === 'ar' ? 'ml-3 h-5 w-5 text-gray-400' : 'mr-3 h-5 w-5 text-gray-400'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`tel:${contact.mobile}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                            {contact.mobile}
                                        </a>
                                    </div>
                                )}
                                {contact.website && (
                                    <div className="flex items-center">
                                        <svg className={locale === 'ar' ? 'ml-3 h-5 w-5 text-gray-400' : 'mr-3 h-5 w-5 text-gray-400'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t.address}</h3>
                                <div className="flex items-start">
                                    <svg className={locale === 'ar' ? 'ml-2 mt-1 h-5 w-5 text-gray-400' : 'mr-2 mt-1 h-5 w-5 text-gray-400'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t.notes}</h3>
                                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{contact.notes}</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        {/* Brief History */}
                        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.briefHistory}</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* Creation */}
                                <div className={locale === 'ar' ? 'flex items-start space-x-3 space-x-reverse' : 'flex items-start space-x-3'}>
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                            <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{t.created}</p>
                                        {contact.created_by && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {t.by} {contact.created_by.name || 'Unknown'}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                            {formatDate(contact.created_at)}
                                        </p>
                                    </div>
                                </div>

                                {/* Last Update */}
                                {contact.updated_at && contact.updated_at !== contact.created_at && (
                                    <div className={locale === 'ar' ? 'flex items-start space-x-3 space-x-reverse pt-3 border-t border-gray-200 dark:border-gray-700' : 'flex items-start space-x-3 pt-3 border-t border-gray-200 dark:border-gray-700'}>
                                        <div className="flex-shrink-0">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{t.lastModified}</p>
                                            {contact.updated_by && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                    {t.by} {contact.updated_by.name || 'Unknown'}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                {formatDate(contact.updated_at)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* View Full History Link */}
                                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <Link
                                        href={route('activities.index', { related_type: 'Contact', related_id: contact.id })}
                                        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        <svg className={locale === 'ar' ? 'ml-1.5 h-4 w-4' : 'mr-1.5 h-4 w-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {t.viewFullActivityHistory}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Metadata Card */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="space-y-4">
                                {contact.created_by_user && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.createdBy}</p>
                                        <p className="mt-1 text-gray-900 dark:text-white">{contact.created_by_user.name}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.createdAt}</p>
                                    <p className="mt-1 text-gray-900 dark:text-white">{formatDate(contact.created_at)}</p>
                                </div>
                                {contact.updated_at !== contact.created_at && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.lastUpdated}</p>
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
