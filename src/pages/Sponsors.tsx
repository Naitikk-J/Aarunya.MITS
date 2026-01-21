import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Sponsors = () => {
    const tiers = [
        {
            title: 'TITLE SPONSORS',
            description: 'Primary power sources for the festival grid.',
            image: '/sponsors-title.jpg',
            sponsors: ['Partner One', 'Partner Two'],
        },
        {
            title: 'GOLD',
            description: 'Boosters that keep the neon running all night.',
            image: '/sponsors-gold.jpg',
            sponsors: ['Gold One', 'Gold Two', 'Gold Three'],
        },
        {
            title: 'COMMUNITY',
            description: 'Friends of the fest and local collaborators.',
            image: '/sponsors-community.jpg',
            sponsors: ['Community One', 'Community Two'],
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        SPONSORS
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        The alliances powering Aarunya 2.0.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <Card key={tier.title} className="border-secondary/30 bg-card/80 backdrop-blur-sm overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={tier.image}
                                    alt={`${tier.title} sponsors`}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-orbitron text-2xl text-primary">{tier.title}</CardTitle>
                                <CardDescription className="font-rajdhani">{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {tier.sponsors.map((s) => (
                                        <Badge key={s} variant="outline" className="font-mono text-xs">
                                            {s}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-6 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            <div className="fixed bottom-6 left-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
            <div className="fixed bottom-6 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
            <div className="fixed bottom-6 right-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
        </div>
    );
};

export default Sponsors;
