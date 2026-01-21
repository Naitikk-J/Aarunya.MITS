import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Competitions = () => {
    const competitions = [
        {
            name: 'CODE SPRINT',
            desc: 'Fast-paced problem solving under neon pressure.',
            image: '/competition-code.jpg',
            organizedBy: 'Tech Club',
            tags: ['TEAM', 'TECH', 'TIMED'],
        },
        {
            name: 'DESIGN ARENA',
            desc: 'UI/UX battles with bold visuals and tight constraints.',
            image: '/competition-design.jpg',
            organizedBy: 'Design Society',
            tags: ['CREATIVE', 'UI', 'PITCH'],
        },
        {
            name: 'CULTURE CLASH',
            desc: 'Stage face-offs across music, dance, and performance.',
            image: '/competition-culture.jpg',
            organizedBy: 'Cultural Committee',
            tags: ['STAGE', 'LIVE', 'CREW'],
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        COMPETITIONS
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        Register, compete, and climb the leaderboard.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {competitions.map((c) => (
                        <Card key={c.name} className="border-secondary/30 bg-card/80 backdrop-blur-sm overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={c.image}
                                    alt={`${c.name} competition`}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-orbitron text-2xl text-primary">{c.name}</CardTitle>
                                <CardDescription className="font-rajdhani">{c.desc}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-3">
                                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Organized by</span>
                                    <p className="font-rajdhani text-sm text-primary mt-1">{c.organizedBy}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {c.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="font-mono text-xs">
                                            {tag}
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

export default Competitions;
