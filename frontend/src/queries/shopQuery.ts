import {useQuery} from "@tanstack/react-query";
import type {Product} from "../types/Product";

export default function useShop() {
    return useQuery<Product[]>({
        queryKey: ['shop'],
        queryFn: async ()=>{
            const res = await fetch('/api/shop');
            if (!res.ok) throw new Error('Problem z pobraniem danych');
            return res.json();
        },
        retry:10,
        retryDelay:3000,
        staleTime:0,
    });
}