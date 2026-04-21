import { useQuery } from "@tanstack/react-query";
import type { Terminarz } from "../types/Terminarz";

export default function useMatches(round: number) {
    return useQuery<Terminarz[]>({
        queryKey: ['matches', round],
        queryFn: async () => {
            const res = await fetch(`/api/matches/${round}`);
            if (!res.ok) throw new Error('Problem z pobraniem meczów');
            return res.json();
        },
        enabled: !!round && !isNaN(round),
    });
}
