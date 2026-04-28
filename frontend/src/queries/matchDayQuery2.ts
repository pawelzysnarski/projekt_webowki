import type {Terminarz} from "../types/Terminarz.ts";
import {useQuery} from "@tanstack/react-query";

export function useAllMatches() {
    return useQuery<Terminarz[]>({
        queryKey: ['matches', 'all'],
        queryFn: async () => {
            const res = await fetch('/api/matches');
            if (!res.ok) throw new Error('Błąd');
            return res.json();
        }
    });
}
