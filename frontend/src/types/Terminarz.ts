import type {Klub} from "./Klub.ts";
import type {Wyniki} from "./Wyniki.ts";

export interface Terminarz {
    id: number;
    idGospodarza: number;
    idGoscia: number;
    dataSpotkania: Date;
    gospodarz: Klub;
    gosc: Klub;
    Numer_Kolejki: number;
    wynik: Wyniki;
}