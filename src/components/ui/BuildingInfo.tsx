import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface BuildingInfoProps {
    buildingId: string | null;
}

const buildingData: Record<string, { name: string; description: string }> = {
    'main-gate': {
        name: 'Main Gate',
        description: 'The grand entrance to the AARUNYA festival grounds. Welcome to the experience!',
    },
    'stage-1': {
        name: 'Main Stage',
        description: 'The primary performance venue featuring headlining acts and major events.',
    },
    'stage-2': {
        name: 'Secondary Stage',
        description: 'Alternative performances and emerging artists showcase their talents here.',
    },
    'food-court': {
        name: 'Food Court',
        description: 'A variety of culinary delights from local and international cuisines.',
    },
    'merch-zone': {
        name: 'Merch Zone',
        description: 'Official AARUNYA merchandise and exclusive festival collectibles.',
    },
    'workshop-area': {
        name: 'Workshop Area',
        description: 'Interactive sessions, hands-on activities, and creative workshops.',
    },
    'competition-arena': {
        name: 'Competition Arena',
        description: 'Battle it out in various competitions and showcase your skills.',
    },
};

export const BuildingInfo = ({ buildingId }: BuildingInfoProps) => {
    if (!buildingId) return null;

    const building = buildingData[buildingId] || {
        name: buildingId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        description: 'Explore this area to discover more about the festival.',
    };

    return (
        <div className="fixed bottom-24 left-6 z-40 max-w-xs">
            <Card className="border-secondary/30 bg-background/80 backdrop-blur-md">
                <CardHeader className="pb-2">
                    <CardTitle className="font-orbitron text-sm text-primary flex items-center gap-2">
                        <MapPin size={14} />
                        {building.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground font-rajdhani">
                        {building.description}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
