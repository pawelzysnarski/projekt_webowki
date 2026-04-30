export interface TicketBenefit {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface TicketTier {
    id: string;
    name: string;
    price: number;
    pricePerMonth: number;
    color: string;
    badge?: string;
    benefits: string[];
    recommended?: boolean;
}

export interface TicketPurchase {
    matchId: number;
    seatId: number;
    firstName: string;
    lastName: string;
    email: string;
    ticketType?: string;
}

export interface PurchasedTicket {
    id: number;
    id_meczu: number;
    id_miejsca: number;
    imie: string;
    nazwisko: string;
    email: string;
    data_zakupu: string;
    czy_oplacony: boolean;
    cena: number;
    typ_biletu: string;
    kod_biletu: string;
    mecz: never;
    miejsce: never;
}