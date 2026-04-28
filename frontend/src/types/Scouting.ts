export interface PunktyScoutingowe {
    ID: number;
    szerokosc_geograficzna: number | null;
    dlugosc_geograficzna: number | null;
    miejsce: string | null;
    data: Date | null;
    Ilosc_miejsca: number;
    zapis?: Zapis[];
}

export interface Zapis {
    ID: number;
    ID_Punktu: number;
    Imie: string;
    Nazwisko: string;
    Wiek: number;
    Email: string;
    punkty_scoutingowe?: PunktyScoutingowe;
}
