import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white dark:from-black dark:via-gray-900 dark:to-black">
                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
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

                {/* Hero Section */}
                <div className="relative flex min-h-screen items-center justify-center px-4 pt-16 sm:px-6 lg:px-8">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Contaboo
                            </span>
                            <span className="mt-2 block text-3xl text-gray-300 sm:text-4xl md:text-5xl lg:text-6xl">
                                Best CRM - ERP System
                            </span>
                        </h1>
                        
                        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl md:text-2xl">
                            Streamline your business operations with our powerful, all-in-one management solution.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="group inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition hover:from-indigo-500 hover:to-purple-500"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="group inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition hover:from-indigo-500 hover:to-purple-500"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center rounded-lg border-2 border-gray-700 px-8 py-4 text-lg font-semibold text-gray-300 transition hover:border-gray-600 hover:text-white"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition hover:border-indigo-500/50">
                                <div className="mb-4 inline-flex rounded-lg bg-indigo-600/10 p-3">
                                    <svg className="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-white">Customer Management</h3>
                                <p className="text-gray-400">Manage your customers, contacts, and relationships all in one place.</p>
                            </div>

                            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition hover:border-purple-500/50">
                                <div className="mb-4 inline-flex rounded-lg bg-purple-600/10 p-3">
                                    <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-white">Analytics & Reports</h3>
                                <p className="text-gray-400">Get insights with powerful analytics and customizable reports.</p>
                            </div>

                            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition hover:border-pink-500/50 sm:col-span-2 lg:col-span-1">
                                <div className="mb-4 inline-flex rounded-lg bg-pink-600/10 p-3">
                                    <svg className="h-6 w-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-white">Secure & Reliable</h3>
                                <p className="text-gray-400">Enterprise-grade security with role-based access control.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
