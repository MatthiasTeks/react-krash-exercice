import { getFilmById, getFilmByTitle } from "@/lib/features/films/filmsAction";

export default async function Film({params}: {params: {search: string}}) {
    const { search } = params;

    let response;

    if (!isNaN(Number(search))) {
        response = await getFilmById(search);
    } else {
        response = await getFilmByTitle(search);
    }

    return (
        <div>            
            {response[0]?.title ? <h1>{response[0].title}</h1> : <p>{response.message}</p>}
        </div>
    );
}