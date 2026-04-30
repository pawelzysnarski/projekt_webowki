import type {SeatsResponse} from '../types/Seat';

export const stadiumQuery = {
    getSeats: async (matchId: number, sector?: string, row?: string): Promise<SeatsResponse> => {
        const params = new URLSearchParams();
        if (sector) params.append('sector', sector);
        if (row) params.append('row', row);

        const url = `/api/tickets/matches/${matchId}/seats${params.toString() ? '?' + params.toString() : ''}`;
        console.log('Fetching seats from:', url);

        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch seats:', response.status, response.statusText);
            throw new Error('Failed to fetch seats');
        }
        return response.json();
    },

    checkSeatAvailability: async (matchId: number, seatId: number): Promise<boolean> => {
        const response = await fetch(`/api/tickets/matches/${matchId}/seats/${seatId}/check`);
        if (!response.ok) throw new Error('Failed to check seat');
        const data = await response.json();
        return data.available;
    }
};