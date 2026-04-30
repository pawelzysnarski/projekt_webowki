import type {Club} from "./Club.ts";

export interface Table {
    idKlubu: number;
    mecze: number;
    zwyciestwa: number;
    remisy: number;
    porazki: number;
    goleZdobyte: number;
    goleStracone: number;
    bilansBramek: number;
    punkty: number;
    klub: Club;
}