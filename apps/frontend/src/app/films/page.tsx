import { getFilms } from "@/lib/features/film/filmAction";
import { DataTable } from "./components/DataTable";
import { filmColumns } from "./components/ColumnDef";

export default async function Films() {
  const response = await getFilms();
  const films = response?.results;

  return <div>{films?.length ? <DataTable columns={filmColumns} data={films} /> : <p>{response.message}</p>}</div>;
}
