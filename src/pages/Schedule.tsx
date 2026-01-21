import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Schedule = () => {
    const days = [
        {
            day: 'DAY 1',
            date: 'FRIDAY',
            image: '/schedule-day1.jpg',
            items: [
                { time: '10:00', title: 'Campus Check-in', type: 'INFO' },
                { time: '12:00', title: 'Opening Ceremony', type: 'MAIN' },
                { time: '16:00', title: 'Workshop Blocks', type: 'WORKSHOP' },
            ],
        },
        {
            day: 'DAY 2',
            date: 'SATURDAY',
            image: '/schedule-day2.jpg',
            items: [
                { time: '11:00', title: 'Competitions Round 1', type: 'COMPETE' },
                { time: '15:00', title: 'Cultural Events', type: 'EVENT' },
                { time: '19:00', title: 'Headliners', type: 'LIVE' },
            ],
        },
        {
            day: 'DAY 3',
            date: 'SUNDAY',
            image: '/schedule-day3.jpg',
            items: [
                { time: '10:30', title: 'Finals', type: 'COMPETE' },
                { time: '14:00', title: 'Prize Distribution', type: 'MAIN' },
                { time: '17:00', title: 'Closing', type: 'MAIN' },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        SCHEDULE
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        Plan your run through the festival grid.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {days.map((d) => (
                        <Card key={d.day} className="border-secondary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={d.image}
                                    alt={`${d.day} schedule`}
                                    className="w-full h-full object-cover opacity-70"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-orbitron text-2xl text-primary">{d.day}</CardTitle>
                                <CardDescription className="font-rajdhani">{d.date}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {d.items.map((item) => (
                                    <div key={`${d.day}-${item.time}-${item.title}`} className="flex items-start justify-between gap-4">
                                        <div className="min-w-[72px] font-mono text-sm text-muted-foreground">{item.time}</div>
                                        <div className="flex-1">
                                            <div className="font-rajdhani text-base text-foreground">{item.title}</div>
                                        </div>
                                        <Badge variant="outline" className="font-mono text-xs">
                                            {item.type}
                                        </Badge>
                                    </div>
                                ))}
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

export default Schedule;
