import { useEffect } from 'react';

export default function ConfirmationModal({ 
    show, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = 'Confirm', 
    cancelText = 'Cancel',
    confirmColor = 'indigo',
    icon = 'question'
}) {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    if (!show) return null;

    const getColorClasses = () => {
        const colors = {
            indigo: {
                bg: 'bg-indigo-100 dark:bg-indigo-900/30',
                text: 'text-indigo-600 dark:text-indigo-400',
                button: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            },
            green: {
                bg: 'bg-green-100 dark:bg-green-900/30',
                text: 'text-green-600 dark:text-green-400',
                button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            },
            red: {
                bg: 'bg-red-100 dark:bg-red-900/30',
                text: 'text-red-600 dark:text-red-400',
                button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            }
        };
        return colors[confirmColor] || colors.indigo;
    };

    const getIcon = () => {
        const icons = {
            question: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
            warning: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            ),
            check: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
            user: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            )
        };
        return icons[icon] || icons.question;
    };

    const colors = getColorClasses();

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with animation */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>
            
            {/* Modal container */}
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Modal content with animation */}
                <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-gray-800 animate-in zoom-in-95">
                    {/* Icon */}
                    <div className="flex items-center justify-center pt-8">
                        <div className={`rounded-full p-3 ${colors.bg}`}>
                            <svg 
                                className={`h-8 w-8 ${colors.text}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                {getIcon()}
                            </svg>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 px-6 pb-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.button}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
