import type {Klub} from "./Klub.ts";

export interface Tabela {
    idKlubu: number;
    mecze: number;
    zwyciestwa: number;
    remisy: number;
    porazki: number;
    goleZdobyte: number;
    goleStracone: number;
    bilansBramek: number;
    punkty: number;
    klub: Klub;
}