import {useQuery} from "@tanstack/react-query"

export default function usePlayers(){
    return useQuery({
        queryKey: ['players'],
        queryFn: async ()=>{
            const res = await fetch('/api/players');
            if (!res.ok) throw new Error('Problem z pobraniem danych');
            return res.json();
        },
    })
}