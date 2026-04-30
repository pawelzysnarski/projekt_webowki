import type {TicketPurchase,PurchasedTicket} from '../types/Ticket';

export const ticketQuery = {
    buyTicket: async (data: TicketPurchase) => {
        const response = await fetch(`/api/tickets/tickets/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to buy ticket');
        }
        return response.json();
    },

    getUserTickets: async (email: string): Promise<PurchasedTicket[]> => {
        const response = await fetch(`/api/tickets/tickets/user/${email}`);
        if (!response.ok) throw new Error('Failed to fetch tickets');
        return response.json();
    },

    cancelTicket: async (ticketId: number) => {
        const response = await fetch(`/api/tickets/tickets/${ticketId}/cancel`, {
            method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to cancel ticket');
        return response.json();
    }
};