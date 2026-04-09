import {useQuery} from "@tanstack/react-query"

export default function useTable(){
    return useQuery({
        queryKey: ['table'],
        queryFn: async ()=>{
            const res = await fetch('/api/table');
            if (!res.ok) throw new Error('Problem z pobraniem danych');
            return res.json();
        },
    })
}