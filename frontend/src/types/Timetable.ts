import type {Club} from "./Club.ts";
import type {Results} from "./Results.ts";

export interface Timetable {
    id: number;
    idGospodarza: number;
    idGoscia: number;
    dataSpotkania: Date;
    gospodarz: Club;
    gosc: Club;
    Numer_Kolejki: number;
    wynik: Results;
}