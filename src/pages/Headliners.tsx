import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Headliners = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const headliners = [
        {
            id: 1,
            title: 'Campus Tech Summit 2024',
            category: 'tech',
            date: 'March 15, 2024',
            description: 'Join us for the biggest tech event of the year featuring AI workshops, hackathons, and networking.',
            status: 'upcoming',
            image: '/api/placeholder/400/200',
            attendees: 500
        },
        {
            id: 2,
            title: 'Euphoria Music Festival',
            category: 'music',
            date: 'April 20, 2024',
            description: 'Experience the ultimate music festival with top artists and immersive performances.',
            status: 'featured',
            image: '/api/placeholder/400/200',
            attendees: 1200
        },
        {
            id: 3,
            title: 'Innovation Challenge',
            category: 'innovation',
            date: 'May 5, 2024',
            description: 'Compete in our annual innovation challenge and showcase your creative solutions.',
            status: 'registration',
            image: '/api/placeholder/400/200',
            attendees: 300
        },
        {
            id: 4,
            title: 'Cultural Exchange Night',
            category: 'culture',
            date: 'June 10, 2024',
            description: 'Celebrate diversity with food, music, and traditions from around the world.',
            status: 'upcoming',
            image: '/api/placeholder/400/200',
            attendees: 800
        }
    ];

    const categories = [
        { id: 'all', label: 'All Events', color: 'bg-primary' },
        { id: 'tech', label: 'Technology', color: 'bg-blue-500' },
        { id: 'music', label: 'Music', color: 'bg-purple-500' },
        { id: 'innovation', label: 'Innovation', color: 'bg-green-500' },
        { id: 'culture', label: 'Culture', color: 'bg-orange-500' }
    ];

    const filteredHeadliners = selectedCategory === 'all'
        ? headliners
        : headliners.filter(event => event.category === selectedCategory);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            upcoming: { label: 'Upcoming', color: 'bg-blue-500' },
            featured: { label: 'Featured', color: 'bg-yellow-500' },
            registration: { label: 'Open for Registration', color: 'bg-green-500' },
            past: { label: 'Past Event', color: 'bg-gray-500' }
        };
        return statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
    };

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        CAMPUS HEADLINERS
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        Discover the most exciting events, achievements, and milestones happening across our campus
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            variant={selectedCategory === category.id ? 'default' : 'outline'}
                            className={`font-orbitron text-sm tracking-wider ${selectedCategory === category.id ? 'animate-neon-pulse' : ''
                                }`}
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredHeadliners.map((event) => {
                        const statusBadge = getStatusBadge(event.status);
                        return (
                            <Card key={event.id} className="group relative overflow-hidden border-secondary/30 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                                <div className="absolute top-4 right-4 z-10">
                                    <Badge className={`${statusBadge.color} text-white font-rajdhani`}>
                                        {statusBadge.label}
                                    </Badge>
                                </div>

                                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 scanlines opacity-20" />
                                    <div className="text-6xl opacity-30">🎪</div>
                                </div>

                                <CardHeader>
                                    <CardTitle className="font-orbitron text-lg text-primary">
                                        {event.title}
                                    </CardTitle>
                                    <CardDescription className="font-rajdhani text-sm">
                                        {event.date} • {event.attendees} attendees
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-muted-foreground font-rajdhani text-sm mb-4 line-clamp-3">
                                        {event.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="font-mono text-xs">
                                            {event.category.toUpperCase()}
                                        </Badge>

                                        <Button
                                            size="sm"
                                            className="font-orbitron text-xs tracking-wider"
                                            variant={event.status === 'registration' ? 'default' : 'outline'}
                                        >
                                            {event.status === 'registration' ? 'REGISTER NOW' : 'LEARN MORE'}
                                        </Button>
                                    </div>
                                </CardContent>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </Card>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredHeadliners.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4 opacity-30">🎭</div>
                        <h3 className="text-2xl font-orbitron text-muted-foreground mb-2">
                            No Events Found
                        </h3>
                        <p className="text-muted-foreground font-rajdhani">
                            Try selecting a different category or check back later for new events.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer decoration */}
            <div className="fixed bottom-6 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            <div className="fixed bottom-6 left-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
            <div className="fixed bottom-6 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
            <div className="fixed bottom-6 right-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
        </div>
    );
};

export default Headliners;