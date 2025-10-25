export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            {/* Outer hexagon ring */}
            <path
                d="M100 20 L160 55 L160 125 L100 160 L40 125 L40 55 Z"
                stroke="url(#gradient1)"
                strokeWidth="3"
                fill="none"
            />
            
            {/* Inner hexagon */}
            <path
                d="M100 40 L140 65 L140 115 L100 140 L60 115 L60 65 Z"
                fill="url(#gradient2)"
                opacity="0.2"
            />
            
            {/* Letter C */}
            <path
                d="M120 70 Q110 60 95 60 Q75 60 75 90 Q75 120 95 120 Q110 120 120 110"
                stroke="url(#gradient1)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
            />
            
            {/* Connection nodes */}
            <circle cx="100" cy="55" r="4" fill="url(#gradient1)" />
            <circle cx="130" cy="72" r="4" fill="url(#gradient1)" />
            <circle cx="130" cy="108" r="4" fill="url(#gradient1)" />
            <circle cx="100" cy="125" r="4" fill="url(#gradient1)" />
            <circle cx="70" cy="108" r="4" fill="url(#gradient1)" />
            <circle cx="70" cy="72" r="4" fill="url(#gradient1)" />
            
            {/* Network lines */}
            <line x1="100" y1="55" x2="130" y2="72" stroke="url(#gradient1)" strokeWidth="1" opacity="0.4" />
            <line x1="130" y1="72" x2="130" y2="108" stroke="url(#gradient1)" strokeWidth="1" opacity="0.4" />
            <line x1="130" y1="108" x2="100" y2="125" stroke="url(#gradient1)" strokeWidth="1" opacity="0.4" />
            <line x1="100" y1="125" x2="70" y2="108" stroke="url(#gradient1)" strokeWidth="1" opacity="0.4" />
            <line x1="70" y1="108" x2="70" y2="72" stroke="url(#gradient1)" strokeWidth="1" opacity="0.4" />
            <line x1="70" y1="72" x2="100" y2="55" stroke="url(#gradient1)" strokeWidth="1" opacity="0.4" />
            
            {/* Gradients */}
            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>
        </svg>
    );
}
