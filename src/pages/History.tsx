import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const History = () => {
    const [selectedEra, setSelectedEra] = useState('all');

    const timelineEvents = [
        {
            id: 1,
            year: '2024',
            era: 'modern',
            title: 'Euphoria Campus Explorer Launch',
            description: 'The official launch of our immersive 3D campus exploration platform, revolutionizing how students and visitors experience campus life.',
            category: 'technology',
            impact: 'high',
            icon: '🚀'
        },
        {
            id: 2,
            year: '2023',
            era: 'modern',
            title: 'Digital Transformation Initiative',
            description: 'Major campus-wide initiative to modernize facilities and integrate cutting-edge technology across all departments.',
            category: 'innovation',
            impact: 'high',
            icon: '💻'
        },
        {
            id: 3,
            year: '2022',
            era: 'modern',
            title: 'Sustainability Milestone',
            description: 'Achieved carbon-neutral status through renewable energy adoption and sustainable campus practices.',
            category: 'environment',
            impact: 'medium',
            icon: '🌱'
        },
        {
            id: 4,
            year: '2020',
            era: 'modern',
            title: 'Remote Learning Revolution',
            description: 'Rapid adaptation to global challenges, implementing comprehensive online learning infrastructure.',
            category: 'education',
            impact: 'high',
            icon: '📚'
        },
        {
            id: 5,
            year: '2018',
            era: 'recent',
            title: 'Research Excellence Recognition',
            description: 'Campus received national recognition for breakthrough research in renewable energy and AI.',
            category: 'research',
            impact: 'high',
            icon: '🔬'
        },
        {
            id: 6,
            year: '2015',
            era: 'recent',
            title: 'Arts & Culture Expansion',
            description: 'Opening of the new performing arts center, establishing the campus as a cultural hub.',
            category: 'culture',
            impact: 'medium',
            icon: '🎭'
        },
        {
            id: 7,
            year: '2010',
            era: 'recent',
            title: 'Global Partnerships',
            description: 'Established international exchange programs with universities across 15 countries.',
            category: 'global',
            impact: 'medium',
            icon: '🌍'
        },
        {
            id: 8,
            year: '2005',
            era: 'recent',
            title: 'Technology Integration',
            description: 'First campus-wide WiFi implementation and introduction of smart classroom technology.',
            category: 'technology',
            impact: 'medium',
            icon: '📡'
        },
        {
            id: 9,
            year: '2000',
            era: 'millennium',
            title: 'New Millennium Campus',
            description: 'Major campus expansion including new science buildings and student recreation facilities.',
            category: 'infrastructure',
            impact: 'high',
            icon: '🏗️'
        },
        {
            id: 10,
            year: '1995',
            era: 'millennium',
            title: 'Internet Revolution',
            description: 'Campus becomes one of the first in the region to provide internet access to all students.',
            category: 'technology',
            impact: 'high',
            icon: '🌐'
        }
    ];

    const eras = [
        { id: 'all', label: 'All Eras', color: 'bg-primary' },
        { id: 'modern', label: 'Modern Era (2020+)', color: 'bg-blue-500' },
        { id: 'recent', label: 'Recent Past (2000-2019)', color: 'bg-purple-500' },
        { id: 'millennium', label: 'Turn of Millennium (1990-2000)', color: 'bg-green-500' }
    ];

    const categories = [
        { id: 'technology', label: 'Technology', color: 'bg-cyan-500', icon: '💻' },
        { id: 'innovation', label: 'Innovation', color: 'bg-yellow-500', icon: '💡' },
        { id: 'education', label: 'Education', color: 'bg-blue-500', icon: '🎓' },
        { id: 'research', label: 'Research', color: 'bg-purple-500', icon: '🔬' },
        { id: 'culture', label: 'Culture', color: 'bg-pink-500', icon: '🎭' },
        { id: 'environment', label: 'Environment', color: 'bg-green-500', icon: '🌱' },
        { id: 'global', label: 'Global', color: 'bg-orange-500', icon: '🌍' },
        { id: 'infrastructure', label: 'Infrastructure', color: 'bg-gray-500', icon: '🏢' }
    ];

    const filteredEvents = selectedEra === 'all'
        ? timelineEvents
        : timelineEvents.filter(event => event.era === selectedEra);

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getCategoryIcon = (category: string) => {
        const categoryData = categories.find(c => c.id === category);
        return categoryData?.icon || '📅';
    };

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        CAMPUS HISTORY
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        Journey through time and discover the milestones that shaped our campus into what it is today
                    </p>
                </div>
            </div>

            {/* Era Filter */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {eras.map((era) => (
                        <Button
                            key={era.id}
                            onClick={() => setSelectedEra(era.id)}
                            variant={selectedEra === era.id ? 'default' : 'outline'}
                            className={`font-orbitron text-sm tracking-wider ${selectedEra === era.id ? 'animate-neon-pulse' : ''
                                }`}
                        >
                            {era.label}
                        </Button>
                    ))}
                </div>

                {/* Category Legend */}
                <div className="mb-12">
                    <h3 className="text-xl font-orbitron text-primary text-center mb-6">Event Categories</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <div key={category.id} className="flex items-center gap-2 px-3 py-2 rounded-full border border-secondary/30 bg-card/50">
                                <span className="text-lg">{category.icon}</span>
                                <span className="text-sm font-rajdhani text-muted-foreground">{category.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-30" />

                    {/* Timeline Events */}
                    <div className="space-y-12">
                        {filteredEvents.map((event, index) => (
                            <div key={event.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                {/* Event Card */}
                                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                                    <Card className="group relative overflow-hidden border-secondary/30 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                                        <div className="p-6">
                                            {/* Year and Icon */}
                                            <div className="flex items-center justify-between mb-4">
                                                <Badge className="bg-primary text-white font-orbitron">
                                                    {event.year}
                                                </Badge>
                                                <div className="text-2xl">{event.icon}</div>
                                            </div>

                                            {/* Impact Indicator */}
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono text-muted-foreground">IMPACT:</span>
                                                    <div className={`w-3 h-3 rounded-full ${getImpactColor(event.impact)}`} />
                                                    <span className="text-xs font-mono uppercase">{event.impact}</span>
                                                </div>
                                            </div>

                                            {/* Title and Description */}
                                            <h3 className="text-lg font-orbitron text-primary mb-3">
                                                {event.title}
                                            </h3>
                                            <p className="text-muted-foreground font-rajdhani text-sm mb-4">
                                                {event.description}
                                            </p>

                                            {/* Category */}
                                            <Badge variant="outline" className="font-mono text-xs">
                                                {event.category.toUpperCase()}
                                            </Badge>
                                        </div>

                                        {/* Hover effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    </Card>
                                </div>

                                {/* Timeline Dot */}
                                <div className="relative z-10">
                                    <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50" />
                                </div>

                                {/* Spacer */}
                                <div className="w-5/12" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4 opacity-30">⏳</div>
                        <h3 className="text-2xl font-orbitron text-muted-foreground mb-2">
                            No Events Found
                        </h3>
                        <p className="text-muted-foreground font-rajdhani">
                            Try selecting a different era or explore other time periods.
                        </p>
                    </div>
                )}

                {/* Historical Statistics */}
                <div className="mt-16">
                    <h2 className="text-3xl font-orbitron font-bold text-center mb-12 text-primary">
                        BY THE NUMBERS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm text-center">
                            <CardContent className="pt-6">
                                <div className="text-3xl font-orbitron text-primary mb-2">10+</div>
                                <div className="text-muted-foreground font-rajdhani text-sm">Major Milestones</div>
                            </CardContent>
                        </Card>
                        <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm text-center">
                            <CardContent className="pt-6">
                                <div className="text-3xl font-orbitron text-primary mb-2">30+</div>
                                <div className="text-muted-foreground font-rajdhani text-sm">Years of Innovation</div>
                            </CardContent>
                        </Card>
                        <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm text-center">
                            <CardContent className="pt-6">
                                <div className="text-3xl font-orbitron text-primary mb-2">8</div>
                                <div className="text-muted-foreground font-rajdhani text-sm">Categories of Events</div>
                            </CardContent>
                        </Card>
                        <Card className="border-secondary/30 bg-card/80 backdrop-blur-sm text-center">
                            <CardContent className="pt-6">
                                <div className="text-3xl font-orbitron text-primary mb-2">∞</div>
                                <div className="text-muted-foreground font-rajdhani text-sm">Possibilities Ahead</div>
                            </CardContent>
                        </Card>
                    </div>
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

export default History;