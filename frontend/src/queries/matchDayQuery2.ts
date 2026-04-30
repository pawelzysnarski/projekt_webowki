import type {Timetable} from "../types/Timetable.ts";
import {useQuery} from "@tanstack/react-query";

export function useAllMatches() {
    return useQuery<Timetable[]>({
        queryKey: ['matches', 'all'],
        queryFn: async () => {
            const res = await fetch('/api/matches');
            if (!res.ok) throw new Error('Błąd');
            return res.json();
        }
    });
}
