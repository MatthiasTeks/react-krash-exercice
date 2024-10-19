'use client';

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useDebounce from "@/hooks/useDebounce";
import { getFilmByTitle } from "@/lib/features/films/filmsAction";
import { FilmType } from "@/types/film";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InputSearch() {
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
    const { data, isLoading, error } = useQuery({
        queryKey: ['films', debouncedSearchTerm],
        queryFn: () => getFilmByTitle(debouncedSearchTerm),
        enabled: !!debouncedSearchTerm,
        refetchOnWindowFocus: false,
    });

    const handleSelectFilm = (filmTitle: string) => {
        router.push(`/films/${filmTitle}`);
    }

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        Search for a film...
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search for a film..."
                            value={searchTerm}
                            onValueChange={(newValue) => setSearchTerm(newValue)} 
                        />
                        <CommandList>
                            {isLoading ? (
                            <CommandEmpty>Loading...</CommandEmpty>
                            ) : error ? (
                            <CommandEmpty>An error occurred: {error.message}</CommandEmpty>
                            ) : data && data.length > 0 ? (
                            <CommandGroup>
                                {data.map((film: FilmType) => (
                                <CommandItem
                                    key={film.episode_id}
                                    value={film.title}
                                    className="cursor-pointer"
                                    onSelect={handleSelectFilm}
                                >
                                    {film.title}
                                </CommandItem>
                                ))}
                            </CommandGroup>
                            ) : (
                            <CommandEmpty>No film found.</CommandEmpty>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}