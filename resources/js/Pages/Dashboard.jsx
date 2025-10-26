import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({ stats, recentActivities }) {
    const [locale, setLocale] = useState(() => {
        return localStorage.getItem('crm_locale') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('crm_locale', locale);
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = locale;
    }, [locale]);

    const handleLanguageSwitch = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        setLocale(newLocale);
    };

    const translations = {
        en: {
            dashboard: 'Dashboard',
            welcomeTitle: 'Welcome to Contaboo CRM',
            welcomeSubtitle: 'Manage your leads and properties from this central hub.',
            totalLeads: 'Total Leads',
            totalProperties: 'Total Properties',
            propertyValue: 'Property Value',
            totalUsers: 'Total Users',
            newLeads: 'new',
            qualifiedLeads: 'qualified',
            available: 'available',
            sold: 'sold',
            availableAndPending: 'Available + Pending',
            activeTeamMembers: 'Active team members',
            forSale: 'For Sale',
            forRent: 'For Rent',
            converted: 'Converted',
            pending: 'Pending',
            recentActivity: 'Recent Activity',
            quickActions: 'Quick Actions',
            addNewLead: 'Add New Lead',
            addNewLeadDesc: 'Create a lead profile',
            addNewProperty: 'Add New Property',
            addNewPropertyDesc: 'List a new property',
            viewAllLeads: 'View All Leads',
            viewAllLeadsDesc: 'Manage your leads',
            viewAllProperties: 'View All Properties',
            viewAllPropertiesDesc: 'Manage your properties',
            noRecentActivity: 'No recent activity',
            minuteAgo: 'minute ago',
            minutesAgo: 'minutes ago',
            hourAgo: 'hour ago',
            hoursAgo: 'hours ago',
            dayAgo: 'day ago',
            daysAgo: 'days ago',
            by: 'by'
        },
        ar: {
            dashboard: 'لوحة التحكم',
            welcomeTitle: 'مرحباً بك في كونتابو CRM',
            welcomeSubtitle: 'إدارة العملاء المحتملين والعقارات من هذا المركز المركزي.',
            totalLeads: 'إجمالي العملاء المحتملين',
            totalProperties: 'إجمالي العقارات',
            propertyValue: 'قيمة العقار',
            totalUsers: 'إجمالي المستخدمين',
            newLeads: 'جديد',
            qualifiedLeads: 'مؤهل',
            available: 'متاح',
            sold: 'مباع',
            availableAndPending: 'متاح + معلق',
            activeTeamMembers: 'أعضاء الفريق النشطون',
            forSale: 'للبيع',
            forRent: 'للإيجار',
            converted: 'محول',
            pending: 'معلق',
            recentActivity: 'النشاط الأخير',
            quickActions: 'إجراءات سريعة',
            addNewLead: 'إضافة عميل محتمل جديد',
            addNewLeadDesc: 'إنشاء ملف تعريف عميل محتمل',
            addNewProperty: 'إضافة عقار جديد',
            addNewPropertyDesc: 'إدراج عقار جديد',
            viewAllLeads: 'عرض جميع العملاء المحتملين',
            viewAllLeadsDesc: 'إدارة العملاء المحتملين',
            viewAllProperties: 'عرض جميع العقارات',
            viewAllPropertiesDesc: 'إدارة العقارات الخاصة بك',
            noRecentActivity: 'لا يوجد نشاط حديث',
            minuteAgo: 'منذ دقيقة',
            minutesAgo: 'منذ دقائق',
            hourAgo: 'منذ ساعة',
            hoursAgo: 'منذ ساعات',
            dayAgo: 'منذ يوم',
            daysAgo: 'منذ أيام',
            by: 'بواسطة'
        }
    };

    const t = translations[locale];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (locale === 'ar') {
            if (diffMins < 60) return `${t.minutesAgo} ${diffMins}`;
            if (diffHours < 24) return `${t.hoursAgo} ${diffHours}`;
            if (diffDays < 7) return `${t.daysAgo} ${diffDays}`;
            return date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: 'numeric' });
        } else {
            if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
            if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
            if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AuthenticatedLayout header={t.dashboard}>
            <Head title={t.dashboard}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {locale === 'en' ? (
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
                ) : (
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
                )}
            </Head>
            <div 
                dir={locale === 'ar' ? 'rtl' : 'ltr'} 
                style={{ fontFamily: locale === 'en' ? 'Roboto, sans-serif' : 'Cairo, sans-serif' }}
            >

            <div className="mb-8 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
                <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{t.welcomeTitle}</h3>
                    <p className="text-indigo-100">{t.welcomeSubtitle}</p>
                </div>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className={locale === 'ar' ? 'mr-4' : 'ml-4'}>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.totalLeads}</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalLeads}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {stats.newLeads} {t.newLeads} · {stats.qualifiedLeads} {t.qualifiedLeads}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div className={locale === 'ar' ? 'mr-4' : 'ml-4'}>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.totalProperties}</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalProperties}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {stats.availableProperties} {t.available} · {stats.soldProperties} {t.sold}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30">
                                <svg className="h-6 w-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className={locale === 'ar' ? 'mr-4' : 'ml-4'}>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.propertyValue}</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(stats.totalPropertyValue)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {t.availableAndPending}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className={locale === 'ar' ? 'mr-4' : 'ml-4'}>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.totalUsers}</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalUsers}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {t.activeTeamMembers}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Stats Row */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.forSale}</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.propertiesForSale}</p>
                        </div>
                        <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                            <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.forRent}</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.propertiesForRent}</p>
                        </div>
                        <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30">
                            <svg className="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.converted}</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.convertedLeads}</p>
                        </div>
                        <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.pending}</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.pendingProperties}</p>
                        </div>
                        <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/30">
                            <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.recentActivity}</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {recentActivities && recentActivities.length > 0 ? (
                                recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                            activity.type === 'lead' 
                                                ? 'bg-indigo-100 dark:bg-indigo-900/30' 
                                                : 'bg-purple-100 dark:bg-purple-900/30'
                                        }`}>
                                            {activity.type === 'lead' ? (
                                                <svg className="h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                                </svg>
                                            ) : (
                                                <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {activity.entity_name} · {t.by} {activity.user} · {formatDate(activity.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t.noRecentActivity}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.quickActions}</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-3">
                            <Link
                                href={route('leads.create')}
                                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition hover:border-indigo-500 hover:bg-indigo-50 dark:border-gray-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/20"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                    <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{t.addNewLead}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.addNewLeadDesc}</p>
                                </div>
                            </Link>
                            <Link
                                href={route('properties.create')}
                                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition hover:border-purple-500 hover:bg-purple-50 dark:border-gray-700 dark:hover:border-purple-500 dark:hover:bg-purple-900/20"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                    <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{t.addNewProperty}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.addNewPropertyDesc}</p>
                                </div>
                            </Link>
                            <Link
                                href={route('leads.index')}
                                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition hover:border-pink-500 hover:bg-pink-50 dark:border-gray-700 dark:hover:border-pink-500 dark:hover:bg-pink-900/20"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30">
                                    <svg className="h-5 w-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{t.viewAllLeads}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.viewAllLeadsDesc}</p>
                                </div>
                            </Link>
                            <Link
                                href={route('properties.index')}
                                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition hover:border-green-500 hover:bg-green-50 dark:border-gray-700 dark:hover:border-green-500 dark:hover:bg-green-900/20"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                    <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{t.viewAllProperties}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.viewAllPropertiesDesc}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
