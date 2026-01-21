interface BottomActionsProps {
  onHeadliners: () => void;
  onTheme: () => void;
  onAboutUs: () => void;
  onHistory: () => void;
}

export function BottomActions({ onHeadliners, onTheme, onAboutUs, onHistory }: BottomActionsProps) {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex items-center justify-between px-6">
      {/* Left action buttons */}
      <div className="flex items-center gap-3">
        <ActionButton label="HEADLINERS" onClick={onHeadliners} />
        <ActionButton label="THEME" onClick={onTheme} />
        <ActionButton label="ABOUT US" onClick={onAboutUs} />
        <ActionButton label="HISTORY" onClick={onHistory} />
      </div>
      
      {/* Center interaction hint */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/50 bg-background/80 backdrop-blur-md">
        <span className="text-muted-foreground font-mono text-sm">PRESS</span>
        <kbd className="w-6 h-6 flex items-center justify-center rounded border border-accent bg-muted text-accent text-xs font-bold animate-pulse">
          E
        </kbd>
        <span className="text-muted-foreground font-mono text-sm">TO INTERACT</span>
      </div>
      
      {/* Register button */}
      <a
        href="#register"
        className="group relative px-6 py-3 font-orbitron font-bold text-lg tracking-wider text-accent-foreground bg-accent border-2 border-accent rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 animate-neon-pulse"
        style={{
          boxShadow: '0 0 20px hsl(330 100% 50% / 0.5), 0 0 40px hsl(330 100% 50% / 0.3)',
        }}
      >
        <span className="relative z-10">REGISTER!!</span>
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-accent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[holographic-shift_3s_ease_infinite]" />
      </a>
    </div>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-orbitron text-sm font-medium tracking-wider text-primary border border-secondary/50 rounded-full bg-background/80 backdrop-blur-md transition-all duration-300 hover:border-primary hover:text-primary-glow hover:shadow-neon"
    >
      {label}
    </button>
  );
}
