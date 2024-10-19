import { speciesColumns } from "./components/ColumnDef";
import { DataTable } from "./components/DataTable";
import { getSpecies } from "@/lib/features/species/speciesAction";

export default async function Species() {
  const response = await getSpecies();
  const species = response?.results;

  return (
    <div>{species?.length ? <DataTable columns={speciesColumns} data={species} /> : <p>{response.message}</p>}</div>
  );
}
