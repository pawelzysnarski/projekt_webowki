import {useQuery} from "@tanstack/react-query";
import type {PunktyScoutingowe} from "../types/Scouting.ts";

export default function useScout() {
    return useQuery<PunktyScoutingowe[]>({
        queryKey: ['scout'],
        queryFn: async ()=>{
            const res = await fetch('/api/scout');
            if (!res.ok) throw new Error('Problem z pobraniem danych');
            return res.json();
        },
    });
}