import {useQuery} from "@tanstack/react-query";

export default function useNews() {
    return useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const res = await fetch('/api/news');
            if (!res.ok) throw new Error('Problem z pobraniem aktualności');
            return res.json();
        },
    });
}
