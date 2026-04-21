import type {Klub} from "./Klub.ts";

export interface Terminarz {
    id: number;
    idGospodarza: number;
    idGoscia: number;
    dataSpotkania: Date;
    gospodarz: Klub;
    gosc: Klub;
}