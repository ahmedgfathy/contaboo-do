import { Link } from '@inertiajs/react';

export default function Pagination({ links, from, to, total, perPage = 15, onPerPageChange }) {
    if (!links) {
        return null;
    }
    
    const hasMultiplePages = links.length > 3;

    // Generate page numbers with ellipsis
    const generatePageNumbers = () => {
        const pages = [];
        const totalPages = links.length - 2; // Exclude prev and next buttons
        
        // Get current page
        const currentPageIndex = links.findIndex(link => link.active);
        const currentPage = currentPageIndex > 0 ? currentPageIndex : 1;
        
        // Always show first page
        pages.push(links[1]);
        
        if (totalPages <= 7) {
            // Show all pages if 7 or fewer
            for (let i = 2; i < links.length - 1; i++) {
                pages.push(links[i]);
            }
        } else {
            // Show current page with 2 pages on each side
            let startPage = Math.max(2, currentPage - 2);
            let endPage = Math.min(totalPages - 1, currentPage + 2);
            
            // Add left ellipsis if needed
            if (startPage > 2) {
                pages.push({ label: '...', url: null, active: false });
            }
            
            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(links[i]);
            }
            
            // Add right ellipsis if needed
            if (endPage < totalPages - 1) {
                pages.push({ label: '...', url: null, active: false });
            }
            
            // Always show last page
            if (endPage < totalPages) {
                pages.push(links[links.length - 2]);
            }
        }
        
        return pages;
    };

    const pageNumbers = generatePageNumbers();
    const prevLink = links[0];
    const nextLink = links[links.length - 1];

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
            {/* Results Info & Per Page Selector */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-semibold text-indigo-600 dark:text-indigo-400">{from}</span> to{' '}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{to}</span> of{' '}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{total}</span> results
                </div>
                
                {/* Per Page Selector */}
                <div className="flex items-center gap-2">
                    <label htmlFor="per-page" className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        Show:
                    </label>
                    <select
                        id="per-page"
                        value={perPage}
                        onChange={(e) => onPerPageChange(parseInt(e.target.value))}
                        className="rounded-lg border-gray-300 py-1.5 pl-3 pr-8 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span className="text-sm text-gray-700 dark:text-gray-300">per page</span>
                </div>
            </div>

            {/* Pagination Controls - Only show if multiple pages */}
            {hasMultiplePages && (
                <nav className="isolate inline-flex rounded-lg shadow-sm" aria-label="Pagination">
                    {/* Previous Button */}
                    {prevLink.url ? (
                    <Link
                        href={prevLink.url}
                        className="relative inline-flex items-center rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="ml-1 hidden sm:inline">Previous</span>
                    </Link>
                ) : (
                    <span className="relative inline-flex items-center rounded-l-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-600 dark:bg-gray-900">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="ml-1 hidden sm:inline">Previous</span>
                    </span>
                )}

                {/* Page Numbers */}
                {pageNumbers.map((link, index) => {
                    if (link.label === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            >
                                ...
                            </span>
                        );
                    }

                    return link.url ? (
                        <Link
                            key={index}
                            href={link.url}
                            className={`relative inline-flex items-center border px-4 py-2 text-sm font-semibold transition-all ${
                                link.active
                                    ? 'z-10 border-indigo-500 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ) : (
                        <span
                            key={index}
                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                            {link.label}
                        </span>
                    );
                })}

                {/* Next Button */}
                {nextLink.url ? (
                    <Link
                        href={nextLink.url}
                        className="relative inline-flex items-center rounded-r-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                        <span className="mr-1 hidden sm:inline">Next</span>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                ) : (
                    <span className="relative inline-flex items-center rounded-r-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-600 dark:bg-gray-900">
                        <span className="mr-1 hidden sm:inline">Next</span>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                )}
                </nav>
            )}

            {/* Mobile Pagination (Simple) - Only show if multiple pages */}
            {hasMultiplePages && (
                <div className="flex justify-between sm:hidden w-full">
                {prevLink.url ? (
                    <Link
                        href={prevLink.url}
                        className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </Link>
                ) : (
                    <span className="relative inline-flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400">
                        Previous
                    </span>
                )}
                {nextLink.url ? (
                    <Link
                        href={nextLink.url}
                        className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </Link>
                ) : (
                    <span className="relative inline-flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400">
                        Next
                    </span>
                )}
                </div>
            )}
        </div>
    );
}
