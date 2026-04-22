import { useQuery } from "@tanstack/react-query";
import type { Personel } from "../types/Personel";

export default function useStaff() {
    return useQuery<Personel[]>({
        queryKey: ['staff'],
        queryFn: async () => {
            const res = await fetch('/api/staff');
            if (!res.ok) throw new Error('Problem z pobraniem danych');
            return res.json();
        },
    });
}
