import { useEffect, useState } from 'react';

export function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing');

    useEffect(() => {
        const texts = [
            'Initializing',
            'Loading campus data',
            'Generating holographic grid',
            'Preparing character',
            'Entering Euphoria'
        ];

        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + Math.random() * 15;

                if (newProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                // Update loading text
                const textIndex = Math.min(Math.floor(newProgress / 25), texts.length - 1);
                setLoadingText(texts[textIndex]);

                return newProgress;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    if (progress >= 100) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#0A0E27] to-[#1a1f3a]">
            {/* VHS Filter Background */}
            <div className="absolute inset-0 vhs-filter opacity-20" />

            {/* Glitch Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-10" />

            {/* Floating Sticker Decorations */}
            <div className="absolute top-20 left-10 floating-sticker text-4xl">📌</div>
            <div className="absolute top-40 right-16 floating-sticker text-5xl">⚡</div>
            <div className="absolute bottom-32 left-20 floating-sticker text-4xl">💥</div>
            <div className="absolute bottom-20 right-10 floating-sticker text-5xl">🎨</div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo with Glitch Effect */}
                <div className="glitch-trigger">
                    <h1 className="kidcore-text font-orbitron text-6xl font-black tracking-[0.3em] text-center">
                        AARUNYA 2.0
                    </h1>
                </div>

                {/* Loading Text with Animation */}
                <div className="text-center">
                    <p className="font-orbitron text-2xl font-bold text-[#00A6FF] mb-2">
                        {loadingText}
                    </p>
                    <p className="text-[#FF5E1F] text-sm font-rajdhani tracking-widest">
                        {Math.round(progress)}%
                    </p>
                </div>

                {/* Progress Bar - Dark Kidcore Style */}
                <div className="w-80 h-6 bg-[#1a1f3a] border-4 border-[#FF85C0] rounded-none overflow-hidden shadow-lg" style={{ boxShadow: '5px 5px 0 #FF5E1F, 0 0 15px rgba(0, 166, 255, 0.3)' }}>
                    <div
                        className="h-full bg-gradient-to-r from-[#00A6FF] via-[#FFDD33] to-[#FF85C0] transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Loading Messages */}
                <div className="mt-8 text-center">
                    <p className="font-rajdhani text-[#B0FF57] opacity-90">
                        🎪 Preparing the carnival of innovation...
                    </p>
                </div>
            </div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 scanlines pointer-events-none opacity-10" />
        </div>
    );
}

