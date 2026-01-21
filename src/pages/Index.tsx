import { useState, useCallback, useEffect } from 'react';
import { CampusScene } from '@/components/3d/CampusScene';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { ControlsGuide } from '@/components/ui/ControlsGuide';
import { BottomActions } from '@/components/ui/BottomActions';
import { BuildingInfo } from '@/components/ui/BuildingInfo';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

const Index = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [webglSupported, setWebglSupported] = useState(true);

    useEffect(() => {
        // Lightweight WebGL capability probe so we can fall back gracefully.
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            setWebglSupported(false);
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
            // Set initial building immediately after loading completes
            setTimeout(() => {
                setHoveredBuilding('main-gate');
            }, 100);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    // After loading finishes, ensure at least one building name/info is visible.
    useEffect(() => {
        if (!isLoading && !hoveredBuilding) {
            setHoveredBuilding('main-gate');
        }
    }, [isLoading, hoveredBuilding]);

    const handleBuildingHover = useCallback((building: string | null) => {
        // Keep showing the last hovered building instead of hiding the panel
        if (building) {
            setHoveredBuilding(building);
        }
    }, []);

    const handleBuildingClick = useCallback((building: string) => {
        console.log('Building clicked:', building);
        // Future: Navigate to section or show modal
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-background">
            {/* Loading Screen */}
            {isLoading && <LoadingScreen />}

            {/* Navigation */}
            <MainNavigation />

            {/* Controls Guide */}
            <ControlsGuide />

            {/* Building Info Panel - Only show after loading */}
            {!isLoading && <BuildingInfo buildingId={hoveredBuilding} />}

            {/* 3D Canvas */}
            <div className="absolute inset-0">
                {webglSupported ? (
                    <CampusScene
                        onBuildingHover={handleBuildingHover}
                        onBuildingClick={handleBuildingClick}
                        isLoading={isLoading}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#0a1a2a] to-[#050c15] text-center">
                        <p className="font-orbitron text-lg text-primary">WebGL is not available on this device.</p>
                        <p className="text-sm text-muted-foreground">Showing a static placeholder instead.</p>
                        <img src="/placeholder.svg" alt="Campus map placeholder" className="max-w-md opacity-80" />
                    </div>
                )}
            </div>

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />

            {/* Vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, hsl(240 80% 5% / 0.8) 100%)',
                }}
            />

            {/* Bottom Actions */}
            <BottomActions />

            {/* Corner decorations */}
            <div className="fixed top-20 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            <div className="fixed top-20 left-6 w-0.5 h-20 bg-gradient-to-b from-primary to-transparent" />
            <div className="fixed top-20 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
            <div className="fixed top-20 right-6 w-0.5 h-20 bg-gradient-to-b from-secondary to-transparent" />
            <div className="fixed bottom-20 left-6 w-20 h-0.5 bg-gradient-to-r from-secondary to-transparent" />
            <div className="fixed bottom-20 left-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
            <div className="fixed bottom-20 right-6 w-20 h-0.5 bg-gradient-to-l from-primary to-transparent" />
            <div className="fixed bottom-20 right-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
        </div>
    );
};

export default Index;
