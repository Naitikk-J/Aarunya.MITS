import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Hierarchy = () => {
    const groups = [
        {
            title: 'CORE',
            description: 'Primary coordinators and decision makers.',
            image: '/hierarchy-core.jpg',
            members: ['Lead A', 'Lead B', 'Lead C'],
        },
        {
            title: 'OPERATIONS',
            description: 'Logistics, venue, and on-ground execution.',
            image: '/hierarchy-operations.jpg',
            members: ['Ops A', 'Ops B', 'Ops C'],
        },
        {
            title: 'CREATIVE',
            description: 'Design, content, and stage production.',
            image: '/hierarchy-creative.jpg',
            members: ['Creative A', 'Creative B', 'Creative C'],
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        HIERARCHY
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        The crew structure behind the festival.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {groups.map((g) => (
                        <Card key={g.title} className="border-secondary/30 bg-card/80 backdrop-blur-sm overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={g.image}
                                    alt={`${g.title} team`}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-orbitron text-2xl text-primary">{g.title}</CardTitle>
                                <CardDescription className="font-rajdhani">{g.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {g.members.map((m) => (
                                        <Badge key={m} variant="outline" className="font-mono text-xs">
                                            {m}
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

export default Hierarchy;
