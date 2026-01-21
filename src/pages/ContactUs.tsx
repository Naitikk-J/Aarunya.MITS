import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ContactUs = () => {
    const contacts = [
        {
            title: 'GENERAL',
            description: 'Questions, passes, and info.',
            image: '/contact-general.jpg',
            items: ['help@aarunya.example', '+91 00000 00000'],
        },
        {
            title: 'SPONSORSHIP',
            description: 'Partnerships and collabs.',
            image: '/contact-sponsorship.jpg',
            items: ['sponsors@aarunya.example', '+91 00000 00001'],
        },
        {
            title: 'EVENTS',
            description: 'Participation and rules.',
            image: '/contact-events.jpg',
            items: ['events@aarunya.example', '+91 00000 00002'],
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        CONTACT US
                    </h1>
                    <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
                        Reach the crew — we respond fast.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contacts.map((c) => (
                        <Card key={c.title} className="border-secondary/30 bg-card/80 backdrop-blur-sm overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={c.image}
                                    alt={`${c.title} contact`}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-orbitron text-2xl text-primary">{c.title}</CardTitle>
                                <CardDescription className="font-rajdhani">{c.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    {c.items.map((item) => (
                                        <Badge key={item} variant="outline" className="font-mono text-xs w-fit">
                                            {item}
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

export default ContactUs;
