import { getFilms } from "@/lib/features/films/filmsAction";
import Link from "next/link";
import InputSearch from "./[search]/components/InputSearch";

export default async function Films() {
    let response = await getFilms();
    let films = response?.results;

    return (
        <div>
            <InputSearch />
            {films?.length ? films.map((film: any) => (
                <ul>
                    <Link href={`/films/${film.title}`}>
                        <li key={film.episode_id}>
                            <h2>{film.title}</h2>
                        </li>
                    </Link>
                </ul>
            )) : <p>{response.message}</p>}
        </div>
    );
}