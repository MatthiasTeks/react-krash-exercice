import { getFilms } from "@/lib/features/films/filmsAction";
import Link from "next/link";
import InputSearch from "./[search]/components/InputSearch";
import { FilmType } from "@/types/film";

export default async function Films() {
    const response = await getFilms();
    const films = response?.results;

    return (
        <div>
            <InputSearch />
            {films?.length ? films.map((film: FilmType) => (
                <ul key={film.episode_id}>
                    <Link href={`/films/${film.title}`}>
                        <li >
                            <h2>{film.title}</h2>
                        </li>
                    </Link>
                </ul>
            )) : <p>{response.message}</p>}
        </div>
    );
}