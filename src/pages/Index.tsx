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
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBuildingHover = useCallback((building: string | null) => {
    setHoveredBuilding(building);
  }, []);

  const handleBuildingClick = useCallback((building: string) => {
    console.log('Building clicked:', building);
    // Future: Navigate to section or show modal
  }, []);

  const handleAction = useCallback((action: string) => {
    console.log('Action:', action);
    setSelectedSection(action);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}
      
      {/* Navigation */}
      <MainNavigation />
      
      {/* Controls Guide */}
      <ControlsGuide />
      
      {/* Building Info Panel */}
      <BuildingInfo buildingId={hoveredBuilding} />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <CampusScene 
          onBuildingHover={handleBuildingHover}
          onBuildingClick={handleBuildingClick}
        />
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
      <BottomActions
        onHeadliners={() => handleAction('headliners')}
        onTheme={() => handleAction('theme')}
        onAboutUs={() => handleAction('about')}
        onHistory={() => handleAction('history')}
      />
      
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
