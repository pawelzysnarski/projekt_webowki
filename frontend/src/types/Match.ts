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