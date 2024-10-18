import { getFilms } from "@/lib/features/films/filmsAction";

export default async function Films() {
    let response = await getFilms();
    let films = response?.results;

    return (
        <div>            
            {films?.length ? films.map((film: any) => (
                <ul>
                    <li key={film.episode_id}>
                        <h2>{film.title}</h2>
                    </li>
                </ul>
            )) : <p>{response.message}</p>}
        </div>
    );
}