import { Keyboard, Mouse, Space } from 'lucide-react';

export function ControlsGuide() {
  return (
    <div className="fixed top-24 left-6 z-40 p-4 rounded-lg border border-secondary/50 bg-background/80 backdrop-blur-md neon-border-purple">
      <div className="space-y-3 font-mono text-sm">
        {/* WASD Controls */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-0.5">
            <kbd className="w-7 h-7 flex items-center justify-center rounded border border-primary/50 bg-muted text-primary text-xs font-bold">
              W
            </kbd>
            <div className="flex gap-0.5">
              <kbd className="w-7 h-7 flex items-center justify-center rounded border border-primary/50 bg-muted text-primary text-xs font-bold">
                A
              </kbd>
              <kbd className="w-7 h-7 flex items-center justify-center rounded border border-primary/50 bg-muted text-primary text-xs font-bold">
                S
              </kbd>
              <kbd className="w-7 h-7 flex items-center justify-center rounded border border-primary/50 bg-muted text-primary text-xs font-bold">
                D
              </kbd>
            </div>
          </div>
          <span className="text-accent">TO MOVE</span>
        </div>
        
        {/* Mouse Control */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center rounded border border-primary/50 bg-muted">
            <Mouse className="w-4 h-4 text-primary" />
          </div>
          <span className="text-accent">
            CLICK TO<br />
            <span className="text-muted-foreground">MOVE CAMERA</span>
          </span>
        </div>
        
        {/* Space to Jump */}
        <div className="flex items-center gap-3">
          <kbd className="px-2 h-7 flex items-center justify-center rounded border border-primary/50 bg-muted text-primary text-xs font-bold">
            SPACE
          </kbd>
          <span className="text-accent">TO DASH</span>
        </div>
      </div>
    </div>
  );
}
