import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/js/pwa-install.js',
                'resources/css/pwa-styles.css'
            ],
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            // Ensure service worker and manifest are not bundled
            external: ['/sw.js', '/manifest.json'],
            output: {
                // Handle PWA assets
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.includes('pwa-')) {
                        return 'assets/pwa/[name].[hash][extname]';
                    }
                    return 'assets/[name].[hash][extname]';
                }
            }
        }
    },
    server: {
        // Ensure service worker is accessible during development
        fs: {
            allow: ['..', './public']
        }
    }
});
