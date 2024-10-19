import { getStarships } from "@/lib/features/starship/startshipAction";
import { DataTable } from "./components/DataTable";
import { startshipColumns } from "./components/ColumnDef";

export default async function Starship() {
  const response = await getStarships();
  const startships = response?.results;

  return (
    <div>
      {startships?.length ? <DataTable columns={startshipColumns} data={startships} /> : <p>{response.message}</p>}
    </div>
  );
}
