interface BuildingInfoProps {
  buildingId: string | null;
}

const BUILDING_INFO: Record<string, { name: string; hindiName: string; description: string; color: string }> = {
  'main-gate': {
    name: 'MITS Main Gate',
    hindiName: 'एमआईटीएस मेन गेट',
    description: 'The iconic entrance to MITS campus. View festival schedule here.',
    color: '#00f3ff',
  },
  'library': {
    name: 'MITS Library',
    hindiName: 'एमआईटीएस लाइबरी',
    description: 'Knowledge hub hosting literary events and workshops.',
    color: '#9d00ff',
  },
  'canteen': {
    name: 'MITS Canteen',
    hindiName: 'एमआईटीएस कैंटीन',
    description: 'Food festival zone with exclusive merch booth.',
    color: '#00ffc3',
  },
  'golden-garden': {
    name: 'Golden Jubilee Garden',
    hindiName: 'गोल्डन जुबिली गार्डन',
    description: 'Outdoor events and sponsor showcase area.',
    color: '#ffcc00',
  },
  'diamond-gate': {
    name: 'Diamond Jubilee Gate',
    hindiName: 'डायमंड जुबिली गेट',
    description: 'Competition registration and tournament arena.',
    color: '#ff006e',
  },
  'civil-dept': {
    name: 'Dept. of Civil Engineering',
    hindiName: 'सिविल इंजीनियरिंग विभाग',
    description: 'Technical competitions and exhibitions.',
    color: '#00ccff',
  },
  'biotech': {
    name: 'Dept. of Biotechnology',
    hindiName: 'जैव प्रौद्योगिकी विभाग',
    description: 'Science workshops and biotech events.',
    color: '#00ff88',
  },
  'architecture': {
    name: 'Dept. of Architecture',
    hindiName: 'वास्तुकला विभाग',
    description: 'Art exhibitions and design competitions.',
    color: '#ff9900',
  },
  'shivji-mandir': {
    name: 'Shivji Mandir',
    hindiName: 'शिवजी मंदिर',
    description: 'Cultural performances and traditional events.',
    color: '#ff6600',
  },
  'medical': {
    name: 'MITS Medical Dispensary',
    hindiName: 'एमआईटीएस मेडिकल डिस्पेंसरी',
    description: 'First aid station and contact center.',
    color: '#ff0066',
  },
};

export function BuildingInfo({ buildingId }: BuildingInfoProps) {
  if (!buildingId || !BUILDING_INFO[buildingId]) return null;
  
  const building = BUILDING_INFO[buildingId];
  
  return (
    <div 
      className="fixed top-24 right-6 z-40 w-72 p-4 rounded-lg border bg-background/90 backdrop-blur-md animate-scale-in"
      style={{
        borderColor: building.color,
        boxShadow: `0 0 20px ${building.color}40, 0 0 40px ${building.color}20`,
      }}
    >
      <div className="space-y-2">
        <h3 
          className="font-orbitron text-lg font-bold"
          style={{ color: building.color }}
        >
          {building.name}
        </h3>
        <p className="font-rajdhani text-sm text-muted-foreground">
          {building.hindiName}
        </p>
        <p className="text-sm text-foreground/80">
          {building.description}
        </p>
        <div 
          className="flex items-center gap-2 pt-2 border-t"
          style={{ borderColor: `${building.color}40` }}
        >
          <kbd 
            className="px-2 py-1 rounded text-xs font-mono border"
            style={{ borderColor: building.color, color: building.color }}
          >
            E
          </kbd>
          <span className="text-xs text-muted-foreground">Click or press to enter</span>
        </div>
      </div>
    </div>
  );
}
