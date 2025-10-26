<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- PWA Meta Tags -->
        <meta name="description" content="A comprehensive CRM system for managing leads, properties, opportunities, and contacts">
        <meta name="theme-color" content="#3b82f6">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="Contaboo CRM">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="application-name" content="Contaboo CRM">
        <meta name="msapplication-TileColor" content="#3b82f6">
        <meta name="msapplication-starturl" content="/">
        
        <!-- PWA Manifest -->
        <link rel="manifest" href="/manifest.json">
        
        <!-- PWA Icons -->
        <link rel="icon" type="image/png" sizes="72x72" href="/pwa-icons/icon-72x72.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/pwa-icons/icon-96x96.png">
        <link rel="icon" type="image/png" sizes="128x128" href="/pwa-icons/icon-128x128.png">
        <link rel="icon" type="image/png" sizes="144x144" href="/pwa-icons/icon-144x144.png">
        <link rel="icon" type="image/png" sizes="152x152" href="/pwa-icons/icon-152x152.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/pwa-icons/icon-192x192.png">
        <link rel="icon" type="image/png" sizes="384x384" href="/pwa-icons/icon-384x384.png">
        <link rel="icon" type="image/png" sizes="512x512" href="/pwa-icons/icon-512x512.png">
        
        <!-- Apple Touch Icons -->
        <link rel="apple-touch-icon" href="/pwa-icons/icon-152x152.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/pwa-icons/icon-72x72.png">
        <link rel="apple-touch-icon" sizes="96x96" href="/pwa-icons/icon-96x96.png">
        <link rel="apple-touch-icon" sizes="128x128" href="/pwa-icons/icon-128x128.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/pwa-icons/icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/pwa-icons/icon-152x152.png">
        <link rel="apple-touch-icon" sizes="192x192" href="/pwa-icons/icon-192x192.png">
        <link rel="apple-touch-icon" sizes="384x384" href="/pwa-icons/icon-384x384.png">
        <link rel="apple-touch-icon" sizes="512x512" href="/pwa-icons/icon-512x512.png">
        
        <!-- Microsoft Tile Icons -->
        <meta name="msapplication-TileImage" content="/pwa-icons/icon-144x144.png">
        <meta name="msapplication-square70x70logo" content="/pwa-icons/icon-72x72.png">
        <meta name="msapplication-square150x150logo" content="/pwa-icons/icon-152x152.png">
        <meta name="msapplication-wide310x150logo" content="/pwa-icons/icon-384x384.png">
        <meta name="msapplication-square310x310logo" content="/pwa-icons/icon-512x512.png">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        
        <!-- PWA Install Script -->
        <script>
            // Preload PWA install functionality
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    // Additional PWA setup can be added here
                    console.log('PWA functionality loaded');
                });
            }
        </script>
    </head>
    <body class="font-sans antialiased dark:bg-gray-900 dark:text-gray-100">
        @inertia
    </body>
</html>
