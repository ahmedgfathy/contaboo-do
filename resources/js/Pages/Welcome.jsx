import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [locale, setLocale] = useState('en');

    const handleLanguageSwitch = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        setLocale(newLocale);
        // You can add actual locale switching logic here
        // For example: router.post(route('language.switch'), { locale: newLocale });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white dark:from-black dark:via-gray-900 dark:to-black">
                {/* Navigation */}
                <nav className="flex-shrink-0 border-b border-gray-800 bg-gray-900/80 backdrop-blur-lg">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ApplicationLogo className="h-10 w-10" />
                                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    Contaboo
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        {/* Language Switcher */}
                                        <button 
                                            onClick={handleLanguageSwitch}
                                            className="flex items-center rounded-full p-1.5 hover:bg-gray-800 transition-colors" 
                                            title={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                                        >
                                            {locale === 'en' ? (
                                                <img 
                                                    src="https://flagcdn.com/w40/us.png" 
                                                    alt="English" 
                                                    className="h-6 w-6 rounded-full" 
                                                />
                                            ) : (
                                                <img 
                                                    src="https://flagcdn.com/w40/eg.png" 
                                                    alt="العربية" 
                                                    className="h-6 w-6 rounded-full" 
                                                />
                                            )}
                                        </button>

                                        <Link
                                            href={route('login')}
                                            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content - Single Page Layout */}
                <div className="flex-1 overflow-hidden">
                    <div className="relative h-full overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl"></div>
                            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl"></div>
                        </div>

                        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                            <div className="grid w-full gap-8 lg:grid-cols-2">
                                {/* Left Side - Features & Info */}
                                                                {/* Left Side - Features & Info */}
                                                                {/* Left Side - Hero Content */}
                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="text-center lg:text-left">
                                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                Contaboo
                                            </span>
                                            <span className="mt-2 block text-2xl text-gray-300 sm:text-3xl lg:text-4xl">
                                                Best CRM - ERP System
                                            </span>
                                        </h1>
                                        
                                        <p className="text-base text-gray-400 sm:text-lg">
                                            Streamline your business operations with our powerful, all-in-one management solution.
                                        </p>
                                    </div>

                                    {/* Features Grid */}
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm transition hover:border-indigo-500/50">
                                            <div className="mb-3 inline-flex rounded-lg bg-indigo-600/10 p-2">
                                                <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="mb-2 text-lg font-semibold text-white">Customer Management</h3>
                                            <p className="text-sm text-gray-400">Manage customers, contacts, and relationships.</p>
                                        </div>

                                        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm transition hover:border-purple-500/50">
                                            <div className="mb-3 inline-flex rounded-lg bg-purple-600/10 p-2">
                                                <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <h3 className="mb-2 text-lg font-semibold text-white">Analytics & Reports</h3>
                                            <p className="text-sm text-gray-400">Powerful analytics and customizable reports.</p>
                                        </div>

                                        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm transition hover:border-pink-500/50">
                                            <div className="mb-3 inline-flex rounded-lg bg-pink-600/10 p-2">
                                                <svg className="h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <h3 className="mb-2 text-lg font-semibold text-white">Secure & Reliable</h3>
                                            <p className="text-sm text-gray-400">Enterprise-grade security with role control.</p>
                                        </div>

                                        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm transition hover:border-green-500/50">
                                            <div className="mb-3 inline-flex rounded-lg bg-green-600/10 p-2">
                                                <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                            </div>
                                            <h3 className="mb-2 text-lg font-semibold text-white">Real Estate Focus</h3>
                                            <p className="text-sm text-gray-400">Built specifically for real estate agencies.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Pricing Offer */}
                                <div className="flex flex-col justify-center">
                                    <div className="mx-auto w-full max-w-md">
                                        <h2 className="mb-3 text-center text-3xl font-bold text-white sm:text-4xl">
                                            Special Launch Offer
                                        </h2>
                                        <p className="mb-4 text-center text-base text-gray-400 sm:text-lg">
                                            Get your Real Estate CRM at an unbeatable price
                                        </p>

                                        <div className="relative">
                                            {/* Discount Badge - Outside the card */}
                                            <div className="absolute -top-2 -right-2 z-10 animate-bounce">
                                                <div className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                                                    50% OFF
                                                </div>
                                            </div>

                                            <div className="group relative overflow-hidden rounded-3xl border-2 border-indigo-500/50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 shadow-2xl transition-all duration-500 hover:border-indigo-400 hover:shadow-indigo-500/50">
                                                {/* Animated Background Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                                                <div className="relative">
                                                    <div className="mb-4 text-center">
                                                        <h3 className="mb-1 text-xl font-semibold text-white">
                                                            Basic Real Estate CRM
                                                        </h3>
                                                        <p className="text-sm text-gray-400">Perfect for growing agencies</p>
                                                    </div>

                                                    {/* Price Container */}
                                                    <div className="mb-4">
                                                        <div className="mb-3 flex items-center justify-center gap-3">
                                                            {/* Old Price */}
                                                            <div className="relative">
                                                                <div className="text-2xl font-bold text-gray-500 line-through">
                                                                    199
                                                                </div>
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="h-0.5 w-full rotate-12 bg-red-500"></div>
                                                                </div>
                                                            </div>

                                                            {/* Arrow */}
                                                            <svg className="h-6 w-6 animate-pulse text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>

                                                            {/* New Price */}
                                                            <div className="animate-pulse">
                                                                <div className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                                    99
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="text-center text-xl font-semibold text-gray-300">
                                                            LE <span className="text-gray-500">/ month / user</span>
                                                        </div>
                                                    </div>
                                                {/* Features List */}
                                                <ul className="mb-4 space-y-2 text-left">
                                                    <li className="flex items-center text-sm text-gray-300">
                                                        <svg className="mr-2 h-4 w-4 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Unlimited Properties & Leads
                                                    </li>
                                                    <li className="flex items-center text-sm text-gray-300">
                                                        <svg className="mr-2 h-4 w-4 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Contact & Opportunity Management
                                                    </li>
                                                    <li className="flex items-center text-sm text-gray-300">
                                                        <svg className="mr-2 h-4 w-4 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Custom Filters & Reports
                                                    </li>
                                                    <li className="flex items-center text-sm text-gray-300">
                                                        <svg className="mr-2 h-4 w-4 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Role-Based Access Control
                                                    </li>
                                                    <li className="flex items-center text-sm text-gray-300">
                                                        <svg className="mr-2 h-4 w-4 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        24/7 Email Support
                                                    </li>
                                                </ul>

                                                {/* CTA Button */}
                                                {!auth.user && (
                                                    <Link
                                                        href={route('register')}
                                                        className="inline-block w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-center text-base font-bold text-white shadow-lg transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/50"
                                                    >
                                                        Get Started Now
                                                    </Link>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer - Fixed at Bottom */}
                <footer className="flex-shrink-0 border-t border-gray-800 bg-gray-900/80 backdrop-blur-lg">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                            <div className="flex items-center gap-3">
                                <ApplicationLogo className="h-6 w-6" />
                                <span className="text-lg font-bold text-white">Contaboo</span>
                            </div>

                            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
                                <a
                                    href="mailto:ahmedgfathy@icloud.com"
                                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-indigo-400"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-medium">Contact Us</span>
                                </a>

                                <div className="text-sm text-gray-400">
                                    © 2025 Contaboo. All rights reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
