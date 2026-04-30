import type {Match} from '../types/Match.ts';

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