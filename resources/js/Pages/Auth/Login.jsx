import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
    const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'en');

    useEffect(() => {
        localStorage.setItem('locale', locale);
    }, [locale]);

    const translations = {
        en: {
            title: 'Log in',
            heading: 'Sign in to your account',
            noAccount: "Don't have an account?",
            getStarted: 'Get started',
            email: 'Email address',
            emailPlaceholder: 'you@example.com',
            password: 'Password',
            passwordPlaceholder: '••••••••',
            remember: 'Remember me',
            forgot: 'Forgot password?',
            signIn: 'Sign in',
            signingIn: 'Signing in...',
            welcomeTitle: 'Welcome to Contaboo',
            welcomeText: 'Your all-in-one CRM and ERP solution for modern businesses. Streamline operations, boost productivity, and grow faster.',
            feature1: 'Advanced Analytics Dashboard',
            feature2: 'Enterprise-Grade Security',
            feature3: '24/7 Customer Support'
        },
        ar: {
            title: 'تسجيل الدخول',
            heading: 'تسجيل الدخول إلى حسابك',
            noAccount: 'ليس لديك حساب؟',
            getStarted: 'ابدأ الآن',
            email: 'البريد الإلكتروني',
            emailPlaceholder: 'you@example.com',
            password: 'كلمة المرور',
            passwordPlaceholder: '••••••••',
            remember: 'تذكرني',
            forgot: 'نسيت كلمة المرور؟',
            signIn: 'تسجيل الدخول',
            signingIn: 'جاري تسجيل الدخول...',
            welcomeTitle: 'مرحباً بك في كونتابو',
            welcomeText: 'الحل الشامل لإدارة علاقات العملاء وتخطيط موارد المؤسسات. نظّم عملياتك، عزز إنتاجيتك، وحقق نمواً أسرع.',
            feature1: 'لوحة تحليلات متقدمة',
            feature2: 'أمان على مستوى المؤسسات',
            feature3: 'دعم عملاء على مدار الساعة'
        }
    };

    const t = translations[locale];

    const handleLanguageSwitch = () => {
        setLocale(locale === 'en' ? 'ar' : 'en');
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
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
                                {t.noAccount}{' '}
                                <Link
                                    href={route('register')}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    {t.getStarted}
                                </Link>
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
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
                                    autoFocus
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
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-2 block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                    placeholder={t.passwordPlaceholder}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600"
                                    />
                                    <label htmlFor="remember" className={`block text-sm text-gray-900 dark:text-gray-300 ${locale === 'ar' ? 'mr-2' : 'ml-2'}`}>
                                        {t.remember}
                                    </label>
                                </div>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        {t.forgot}
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-950"
                            >
                                {processing ? t.signingIn : t.signIn}
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
