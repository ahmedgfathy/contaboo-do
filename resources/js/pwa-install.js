// PWA Install Manager
class PWAInstallManager {
    constructor() {
        this.deferredPrompt = null;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
        this.isAndroid = /Android/.test(navigator.userAgent);
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        this.init();
    }

    init() {
        // Don't show install prompt if already installed
        if (this.isStandalone) {
            console.log('PWA is already installed');
            return;
        }

        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('beforeinstallprompt event triggered');
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Save the event so it can be triggered later
            this.deferredPrompt = e;
            // Show custom install button
            this.showInstallPrompt();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', (e) => {
            console.log('PWA was installed');
            this.hideInstallPrompt();
            this.showInstalledMessage();
        });

        // Check for iOS Safari
        if (this.isIOS && !this.isStandalone) {
            setTimeout(() => {
                this.showIOSInstallPrompt();
            }, 3000); // Show after 3 seconds
        }

        // Register service worker
        this.registerServiceWorker();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered successfully:', registration);

                // Listen for service worker updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateAvailablePrompt();
                        }
                    });
                });
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }

    showInstallPrompt() {
        // Create install prompt for desktop/Android
        const installBanner = document.createElement('div');
        installBanner.id = 'pwa-install-banner';
        installBanner.className = 'pwa-install-banner';
        installBanner.innerHTML = `
            <div class="pwa-install-content">
                <div class="pwa-install-icon">
                    <img src="/pwa-icons/icon-96x96.png" alt="Contaboo CRM" width="48" height="48">
                </div>
                <div class="pwa-install-text">
                    <div class="pwa-install-title">Install Contaboo CRM</div>
                    <div class="pwa-install-subtitle">
                        ${this.isMobile ? 
                            'Add to your home screen for quick access' : 
                            'Install the app for a better experience'
                        }
                    </div>
                </div>
                <div class="pwa-install-actions">
                    <button id="pwa-install-btn" class="pwa-btn pwa-btn-primary">
                        ${this.isMobile ? 'Add to Home Screen' : 'Install App'}
                    </button>
                    <button id="pwa-dismiss-btn" class="pwa-btn pwa-btn-secondary">
                        Later
                    </button>
                </div>
                <button id="pwa-close-btn" class="pwa-close-btn" aria-label="Close">×</button>
            </div>
        `;

        document.body.appendChild(installBanner);
        
        // Add event listeners
        document.getElementById('pwa-install-btn').addEventListener('click', () => {
            this.installApp();
        });

        document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
            this.dismissPrompt();
        });

        document.getElementById('pwa-close-btn').addEventListener('click', () => {
            this.dismissPrompt();
        });

        // Show banner with animation
        setTimeout(() => {
            installBanner.classList.add('pwa-banner-show');
        }, 100);
    }

    showIOSInstallPrompt() {
        // Create iOS-specific install prompt
        const iosPrompt = document.createElement('div');
        iosPrompt.id = 'pwa-ios-prompt';
        iosPrompt.className = 'pwa-ios-prompt';
        iosPrompt.innerHTML = `
            <div class="pwa-ios-content">
                <div class="pwa-ios-header">
                    <img src="/pwa-icons/icon-96x96.png" alt="Contaboo CRM" width="48" height="48">
                    <div>
                        <div class="pwa-ios-title">Install Contaboo CRM</div>
                        <div class="pwa-ios-subtitle">Add to your home screen</div>
                    </div>
                    <button id="pwa-ios-close" class="pwa-close-btn">×</button>
                </div>
                <div class="pwa-ios-instructions">
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-number">1</span>
                        <span>Tap the share button <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg></span>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-number">2</span>
                        <span>Select "Add to Home Screen"</span>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-number">3</span>
                        <span>Tap "Add" to install</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(iosPrompt);

        document.getElementById('pwa-ios-close').addEventListener('click', () => {
            this.hideIOSPrompt();
        });

        // Show prompt with animation
        setTimeout(() => {
            iosPrompt.classList.add('pwa-ios-show');
        }, 100);
    }

    async installApp() {
        if (!this.deferredPrompt) {
            console.log('No deferred prompt available');
            return;
        }

        // Show the install prompt
        this.deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // Clear the deferredPrompt
        this.deferredPrompt = null;
        this.hideInstallPrompt();
    }

    dismissPrompt() {
        this.hideInstallPrompt();
        // Store that user dismissed the prompt (don't show again for 7 days)
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    }

    hideInstallPrompt() {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) {
            banner.classList.remove('pwa-banner-show');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    hideIOSPrompt() {
        const prompt = document.getElementById('pwa-ios-prompt');
        if (prompt) {
            prompt.classList.remove('pwa-ios-show');
            setTimeout(() => {
                prompt.remove();
            }, 300);
        }
        // Store that user dismissed the iOS prompt
        localStorage.setItem('pwa-ios-dismissed', Date.now().toString());
    }

    showInstalledMessage() {
        const message = document.createElement('div');
        message.className = 'pwa-success-message';
        message.innerHTML = `
            <div class="pwa-success-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Contaboo CRM has been installed successfully!</span>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('pwa-success-show');
        }, 100);

        setTimeout(() => {
            message.classList.remove('pwa-success-show');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 4000);
    }

    showUpdateAvailablePrompt() {
        const updatePrompt = document.createElement('div');
        updatePrompt.className = 'pwa-update-prompt';
        updatePrompt.innerHTML = `
            <div class="pwa-update-content">
                <div class="pwa-update-text">
                    <div class="pwa-update-title">Update Available</div>
                    <div class="pwa-update-subtitle">A new version of Contaboo CRM is available</div>
                </div>
                <div class="pwa-update-actions">
                    <button id="pwa-update-btn" class="pwa-btn pwa-btn-primary">Update</button>
                    <button id="pwa-update-dismiss" class="pwa-btn pwa-btn-secondary">Later</button>
                </div>
            </div>
        `;

        document.body.appendChild(updatePrompt);

        document.getElementById('pwa-update-btn').addEventListener('click', () => {
            window.location.reload();
        });

        document.getElementById('pwa-update-dismiss').addEventListener('click', () => {
            updatePrompt.remove();
        });

        setTimeout(() => {
            updatePrompt.classList.add('pwa-update-show');
        }, 100);
    }

    // Check if we should show install prompt (respect user's dismissal)
    shouldShowPrompt() {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        const iosDismissed = localStorage.getItem('pwa-ios-dismissed');
        
        if (dismissed) {
            const dismissedTime = parseInt(dismissed);
            const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days
            if (dismissedTime > weekAgo) {
                return false;
            }
        }

        if (this.isIOS && iosDismissed) {
            const dismissedTime = parseInt(iosDismissed);
            const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days
            if (dismissedTime > weekAgo) {
                return false;
            }
        }

        return true;
    }
}

// Initialize PWA Install Manager when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PWAInstallManager();
    });
} else {
    new PWAInstallManager();
}

// Export for potential external use
window.PWAInstallManager = PWAInstallManager;