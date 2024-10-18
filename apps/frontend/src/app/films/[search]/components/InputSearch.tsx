'use client';

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { getFilmByTitle } from "@/lib/features/films/filmsAction";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function InputSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300); 
  
    const { data, isLoading, error } = useQuery({
        queryKey: ['films', debouncedSearchTerm],
        queryFn: () => getFilmByTitle(debouncedSearchTerm),
        enabled: !!debouncedSearchTerm,
        refetchOnWindowFocus: false,
    });

    return (
        <div>
            <Input 
                type="text" 
                placeholder="Search for a film" 
                id="search" 
                name="search" 
                required         
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isLoading && <p>Loading...</p>}
            {error && <p>An error occurred: {error.message}</p>}
            <ul>
                {data?.map((film: any) => (
                <li key={film.episode_id}>{film.title}</li>
                ))}
            </ul>
        </div>
    )
}