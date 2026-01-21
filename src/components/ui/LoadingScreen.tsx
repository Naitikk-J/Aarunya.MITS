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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      {/* Animated grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* Logo */}
      <div className="relative mb-8 animate-float">
        <h1 className="font-orbitron text-5xl font-black tracking-[0.3em] text-transparent bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text">
          AARUNYA 2.0
        </h1>
        <div className="absolute -inset-4 blur-2xl bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 -z-10" />
      </div>
      
      {/* Euphoria subtitle */}
      <p className="font-rajdhani text-xl tracking-[0.5em] text-secondary mb-12 animate-pulse">
        EUPHORIA
      </p>
      
      {/* Progress bar */}
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Loading text */}
      <p className="font-mono text-sm text-muted-foreground animate-pulse">
        {loadingText}...
      </p>
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/50" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-secondary/50" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-secondary/50" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/50" />
    </div>
  );
}
