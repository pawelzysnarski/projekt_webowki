export interface Akapit {
    ID: number;
    ID_Wiadomo_ci: number;
    Tre__: string;
}

export interface NewsItem {
    ID: number;
    Zdj_cie: string;
    Nag__wek: string;
    Data: Date;
    akapity: Akapit[];
}
