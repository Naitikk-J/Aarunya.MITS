import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState('cyberpunk');

  const themes = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Neon',
      description: 'Futuristic neon aesthetic with glowing elements and dark backgrounds',
      preview: {
        primary: 'hsl(330 100% 50%)',
        secondary: 'hsl(240 100% 50%)',
        accent: 'hsl(180 100% 50%)'
      },
      features: ['Neon glows', 'Holographic effects', 'Dark mode optimized', 'Cyberpunk typography'],
      active: true
    },
    {
      id: 'holographic',
      name: 'Holographic Blue',
      description: 'Clean holographic interface with blue accents and transparent elements',
      preview: {
        primary: 'hsl(210 100% 60%)',
        secondary: 'hsl(190 100% 50%)',
        accent: 'hsl(270 100% 60%)'
      },
      features: ['Transparent overlays', 'Blue gradients', 'Modern typography', 'Glass morphism'],
      active: false
    },
    {
      id: 'matrix',
      name: 'Matrix Green',
      description: 'Classic matrix theme with green code rain and terminal aesthetics',
      preview: {
        primary: 'hsl(120 100% 50%)',
        secondary: 'hsl(100 100% 40%)',
        accent: 'hsl(80 100% 50%)'
      },
      features: ['Code rain effects', 'Terminal fonts', 'Monospace typography', 'Retro computing'],
      active: false
    },
    {
      id: 'sunset',
      name: 'Sunset Gradient',
      description: 'Warm sunset colors with orange and purple gradients for a vibrant feel',
      preview: {
        primary: 'hsl(25 100% 60%)',
        secondary: 'hsl(280 100% 60%)',
        accent: 'hsl(320 100% 60%)'
      },
      features: ['Warm gradients', 'Sunset palettes', 'Friendly typography', 'Energetic vibes'],
      active: false
    }
  ];

  const applyTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    // In a real app, this would update CSS variables or theme context
    console.log('Applying theme:', themeId);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
        <div className="absolute inset-0 scanlines opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            VISUAL THEMES
          </h1>
          <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
            Customize your campus explorer experience with our collection of immersive visual themes
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Current Theme Preview */}
        <div className="mb-12">
          <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-orbitron text-2xl text-primary">
                Current Theme: {themes.find(t => t.id === selectedTheme)?.name}
              </CardTitle>
              <CardDescription className="font-rajdhani">
                {themes.find(t => t.id === selectedTheme)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-border" 
                       style={{ backgroundColor: themes.find(t => t.id === selectedTheme)?.preview.primary }} />
                  <div className="w-8 h-8 rounded-full border-2 border-border" 
                       style={{ backgroundColor: themes.find(t => t.id === selectedTheme)?.preview.secondary }} />
                  <div className="w-8 h-8 rounded-full border-2 border-border" 
                       style={{ backgroundColor: themes.find(t => t.id === selectedTheme)?.preview.accent }} />
                </div>
                <span className="text-muted-foreground font-mono text-sm">
                  Primary • Secondary • Accent
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {themes.find(t => t.id === selectedTheme)?.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Theme Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {themes.map((theme) => (
            <Card key={theme.id} className={`group relative overflow-hidden border-secondary/30 bg-card/80 backdrop-blur-sm transition-all duration-300 ${
              selectedTheme === theme.id ? 'border-primary/50 shadow-lg shadow-primary/20' : 'hover:border-secondary/50'
            }`}>
              {/* Theme Preview */}
              <div className="h-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-20" 
                     style={{ 
                       backgroundImage: `linear-gradient(135deg, ${theme.preview.primary}, ${theme.preview.secondary}, ${theme.preview.accent})` 
                     }} />
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl opacity-60">🎨</div>
                </div>
                {selectedTheme === theme.id && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white font-rajdhani text-xs">
                      ACTIVE
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="font-orbitron text-xl text-primary">
                  {theme.name}
                </CardTitle>
                <CardDescription className="font-rajdhani text-sm">
                  {theme.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    <div className="w-6 h-6 rounded-full border border-border" 
                         style={{ backgroundColor: theme.preview.primary }} />
                    <div className="w-6 h-6 rounded-full border border-border" 
                         style={{ backgroundColor: theme.preview.secondary }} />
                    <div className="w-6 h-6 rounded-full border border-border" 
                         style={{ backgroundColor: theme.preview.accent }} />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {theme.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="font-mono text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  onClick={() => applyTheme(theme.id)}
                  className={`w-full font-orbitron text-sm tracking-wider ${
                    selectedTheme === theme.id 
                      ? 'bg-secondary hover:bg-secondary/80' 
                      : 'bg-primary hover:bg-primary/80 animate-neon-pulse'
                  }`}
                  variant={selectedTheme === theme.id ? 'secondary' : 'default'}
                >
                  {selectedTheme === theme.id ? 'CURRENT THEME' : 'APPLY THEME'}
                </Button>
              </CardContent>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Theme Customization Info */}
        <div className="mt-12">
          <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-orbitron text-xl text-primary">
                Theme Customization
              </CardTitle>
              <CardDescription className="font-rajdhani">
                Personalize your experience even further
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🌈</div>
                  <h4 className="font-orbitron text-primary mb-2">Color Schemes</h4>
                  <p className="text-muted-foreground font-rajdhani text-sm">
                    Choose from predefined color palettes or create your own
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-orbitron text-primary mb-2">Animations</h4>
                  <p className="text-muted-foreground font-rajdhani text-sm">
                    Toggle animation effects and transition speeds
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔧</div>
                  <h4 className="font-orbitron text-primary mb-2">Advanced</h4>
                  <p className="text-muted-foreground font-rajdhani text-sm">
                    Fine-tune individual elements and components
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer decoration */}
      <div className="fixed bottom-6 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
      <div className="fixed bottom-6 left-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
      <div className="fixed bottom-6 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
      <div className="fixed bottom-6 right-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
    </div>
  );
};

export default Theme;