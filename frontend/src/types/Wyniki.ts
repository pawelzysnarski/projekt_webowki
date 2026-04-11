import type {Terminarz} from "./Terminarz.ts";

export interface Wyniki {
    idMeczu: number;
    bramkiGospodarzy: number;
    bramkiGosci: number;
    mecz: Terminarz;
}