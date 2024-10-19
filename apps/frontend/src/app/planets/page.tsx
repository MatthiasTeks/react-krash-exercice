import { getPlanets } from "@/lib/features/planet/planetAction";
import { planetColumns } from "./components/ColumnDef";
import { DataTable } from "./components/DataTable";

export default async function Planet() {
  const response = await getPlanets();
  const planets = response?.results;

  return (
    <div>{planets?.length ? <DataTable columns={planetColumns} data={planets} /> : <p>{response.message}</p>}</div>
  );
}
