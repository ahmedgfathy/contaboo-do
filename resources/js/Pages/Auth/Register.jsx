import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Register() {
    const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'en');

    useEffect(() => {
        localStorage.setItem('locale', locale);
    }, [locale]);

    const translations = {
        en: {
            title: 'Register',
            heading: 'Create your account',
            haveAccount: 'Already have an account?',
            signIn: 'Sign in',
            fullName: 'Full name',
            namePlaceholder: 'John Doe',
            email: 'Email address',
            emailPlaceholder: 'you@example.com',
            password: 'Password',
            passwordPlaceholder: '••••••••',
            confirmPassword: 'Confirm password',
            confirmPlaceholder: '••••••••',
            register: 'Register',
            registering: 'Registering...',
            welcomeTitle: 'Join Contaboo Today',
            welcomeText: 'Start your journey with the most powerful CRM and ERP platform. Transform your business operations and achieve unprecedented growth.',
            feature1: 'Free 30-Day Trial',
            feature2: 'No Credit Card Required',
            feature3: 'Cancel Anytime'
        },
        ar: {
            title: 'تسجيل',
            heading: 'إنشاء حسابك',
            haveAccount: 'لديك حساب بالفعل؟',
            signIn: 'تسجيل الدخول',
            fullName: 'الاسم الكامل',
            namePlaceholder: 'أحمد محمد',
            email: 'البريد الإلكتروني',
            emailPlaceholder: 'you@example.com',
            password: 'كلمة المرور',
            passwordPlaceholder: '••••••••',
            confirmPassword: 'تأكيد كلمة المرور',
            confirmPlaceholder: '••••••••',
            register: 'تسجيل',
            registering: 'جاري التسجيل...',
            welcomeTitle: 'انضم إلى كونتابو اليوم',
            welcomeText: 'ابدأ رحلتك مع أقوى منصة لإدارة علاقات العملاء وتخطيط موارد المؤسسات. حوّل عمليات شركتك وحقق نمواً غير مسبوق.',
            feature1: 'تجربة مجانية لمدة 30 يوماً',
            feature2: 'لا حاجة لبطاقة ائتمانية',
            feature3: 'إلغاء في أي وقت'
        }
    };

    const t = translations[locale];

    const handleLanguageSwitch = () => {
        setLocale(locale === 'en' ? 'ar' : 'en');
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title={t.title}>
                {locale === 'en' ? (
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
                ) : (
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
                )}
            </Head>

            <div 
                className="flex min-h-screen"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                style={{ fontFamily: locale === 'en' ? 'Roboto, sans-serif' : 'Cairo, sans-serif' }}
            >
                {/* Left Side - Form */}
                <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-20 xl:px-24 bg-white dark:bg-gray-950">
                    <div className="mx-auto w-full max-w-sm">
                        <div className="mb-8">
                            <Link href="/">
                                <ApplicationLogo className="h-16 w-16" />
                            </Link>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t.heading}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {t.haveAccount}{' '}
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    {t.signIn}
                                </Link>
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    {t.fullName}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    autoComplete="name"
                                    autoFocus
                                    required
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-2 block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                    placeholder={t.namePlaceholder}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    {t.email}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    required
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-2 block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                    placeholder={t.emailPlaceholder}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    {t.password}
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-2 block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                    placeholder={t.passwordPlaceholder}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    {t.confirmPassword}
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="mt-2 block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                    placeholder={t.confirmPlaceholder}
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-950"
                            >
                                {processing ? t.registering : t.register}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side - Gradient Background */}
                <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
                    
                    {/* Language Switcher at Top */}
                    <div className="absolute top-6 right-6 z-10">
                        <button
                            onClick={handleLanguageSwitch}
                            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm hover:bg-white/20"
                            title={locale === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
                        >
                            {locale === 'en' ? (
                                <>
                                    <img src="https://flagcdn.com/w40/eg.png" alt="العربية" className="h-4 w-6 object-cover" />
                                    <span>العربية</span>
                                </>
                            ) : (
                                <>
                                    <img src="https://flagcdn.com/w40/us.png" alt="English" className="h-4 w-6 object-cover" />
                                    <span>English</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="relative flex h-full flex-col justify-center px-20">
                        <div className="text-white">
                            <h1 className="text-4xl font-bold mb-6">
                                {t.welcomeTitle}
                            </h1>
                            <p className="text-xl text-indigo-100 mb-8">
                                {t.welcomeText}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">{t.feature1}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">{t.feature2}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">{t.feature3}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
