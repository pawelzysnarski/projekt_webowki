import {useQuery} from '@tanstack/react-query';
import type {Product} from '../types/Product';

export default function useProduct(id: string | undefined) {
    return useQuery<Product>({
        queryKey: ['product', id],
        queryFn: async ()=>{
            const res = await fetch(`/api/shop/${id}`);
            if (!res.ok) throw new Error('Problem z pobraniem danych');
            const data = await res.json();
            return data;
        },
        enabled: !!id,
        retry:10,
        retryDelay:3000,
        staleTime:0,
    });
}