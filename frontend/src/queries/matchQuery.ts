export interface Match {
    id: number;
    przeciwnik: string;
    czy_domowy: boolean;
    data_meczu: string;
    stadion?: string;
    miasto?: string;
    match_type?: string;
    location?: string;
    available_ticket_types?: string[];
}

export const matchQuery = {
    getUpcomingMatches: async (): Promise<Match[]> => {
        const response = await fetch(`/api/tickets/matches/upcoming`);
        if (!response.ok) throw new Error('Failed to fetch matches');
        return response.json();
    },

    getMatch: async (id: number): Promise<Match> => {
        const response = await fetch(`/api/tickets/matches/${id}`);
        if (!response.ok) throw new Error('Failed to fetch match');
        return response.json();
    }
};