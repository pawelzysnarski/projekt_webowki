import { useQuery } from "@tanstack/react-query";
import type { Timetable } from "../types/Timetable.ts";

export default function useMatches(round: number) {
    return useQuery<Timetable[]>({
        queryKey: ['matches', round],
        queryFn: async () => {
            const res = await fetch(`/api/matches/${round}`);
            if (!res.ok) throw new Error('Problem z pobraniem meczów');
            return res.json();
        },
        enabled: !!round && !isNaN(round),
        retry:10,
        retryDelay:3000,
        staleTime:0,
    });
}
