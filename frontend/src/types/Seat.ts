export interface Seat {
    id: number;
    sektor: string;
    rzad: string;
    numer: number;
    czy_zajete: boolean;
    cena: number;
    typ_biletu: string;
    id_meczu: number;
}

export interface SeatsResponse {
    is_home: boolean;
    seats: Seat[];
    info: string;
}