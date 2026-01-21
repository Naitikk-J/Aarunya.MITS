export const generateAarunyaId = (): string => {
    // Generate format: AAR-XXXXX-XXXXX
    // Where X is a random alphanumeric character
    const generateSegment = (length: number): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const timestamp = Date.now().toString().slice(-4); // Last 4 digits of timestamp for uniqueness
    return `AAR-${generateSegment(4)}${timestamp}-${generateSegment(5)}`;
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidAarunyaId = (id: string): boolean => {
    // AARUNYA ID format: AAR-XXXXX-XXXXX
    const aarunyaRegex = /^AAR-[A-Z0-9]{8}-[A-Z0-9]{5}$/;
    return aarunyaRegex.test(id);
};

export const isEmailOrAarunyaId = (identifier: string): 'email' | 'aarunya_id' | null => {
    if (isValidEmail(identifier)) {
        return 'email';
    }
    if (isValidAarunyaId(identifier)) {
        return 'aarunya_id';
    }
    return null;
};
