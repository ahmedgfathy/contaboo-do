import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 animate-fade-in"
                    aria-label="Scroll to top"
                    title="Back to top"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-0 blur transition-opacity duration-300 group-hover:opacity-75"></div>
                    <svg 
                        className="relative h-7 w-7 transition-transform duration-300 group-hover:-translate-y-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M5 15l7-7 7 7" 
                        />
                    </svg>
                </button>
            )}
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
