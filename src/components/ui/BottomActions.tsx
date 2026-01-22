import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Ticket, MapPin } from 'lucide-react';

export const BottomActions = () => {
    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
            <div className="flex items-center gap-3 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-secondary/20">
                <Link to="/schedule">
                    <Button variant="ghost" size="sm" className="font-mono text-xs tracking-wider gap-2">
                        <Calendar size={16} />
                        SCHEDULE
                    </Button>
                </Link>
                <Link to="/register">
                    <Button size="sm" className="font-mono text-xs tracking-wider gap-2">
                        <Ticket size={16} />
                        GET PASS
                    </Button>
                </Link>
                <Link to="/events">
                    <Button variant="ghost" size="sm" className="font-mono text-xs tracking-wider gap-2">
                        <MapPin size={16} />
                        EXPLORE
                    </Button>
                </Link>
            </div>
        </div>
    );
};
