import type {Seat} from './Seat';

export type TicketType = 'zloty_jelen' | 'srebrny_jez' | 'brazowy_los' | 'normalny';

export interface Sector {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    seats: Seat[];
    allowedTicketTypes: TicketType[];
}