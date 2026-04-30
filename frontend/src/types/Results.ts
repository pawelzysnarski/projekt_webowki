import type {Timetable} from "./Timetable.ts";

export interface Results {
    idMeczu: number;
    bramkiGospodarzy: number;
    bramkiGosci: number;
    mecz: Timetable;
}