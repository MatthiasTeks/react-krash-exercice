import { getFilms } from "@/lib/features/films/filmsAction";
import { DataTable } from "./[search]/components/DataTable";
import { columns } from "./[search]/components/ColumnDef";

export default async function Films() {
    const response = await getFilms();
    const films = response?.results;

    return (
        <div>
            {films?.length ? <DataTable columns={columns} data={films} /> : <p>{response.message}</p>}
        </div>
    );
}