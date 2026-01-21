import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'SCHEDULE', href: '#schedule' },
  { label: 'EVENTS', href: '#events' },
  { label: 'MERCH', href: '#merch' },
  { label: 'COMPETITIONS', href: '#competitions' },
  { label: 'SPONSORS', href: '#sponsors' },
  { label: 'CONTACT US', href: '#contact' },
];

export function MainNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-secondary/30">
      {/* Left nav items */}
      <div className="flex items-center gap-6">
        {NAV_ITEMS.slice(0, 3).map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="font-orbitron text-sm font-medium tracking-wider text-primary hover:text-primary-glow transition-all duration-300 hover:neon-text"
          >
            {item.label}
          </a>
        ))}
      </div>
      
      {/* Center logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-orbitron text-2xl font-black tracking-widest bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-pulse">
          AARUNYA 2.0
        </h1>
      </div>
      
      {/* Right nav items */}
      <div className="flex items-center gap-6">
        {NAV_ITEMS.slice(3).map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="font-orbitron text-sm font-medium tracking-wider text-primary hover:text-primary-glow transition-all duration-300 hover:neon-text"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
