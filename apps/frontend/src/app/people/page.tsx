import { getPeoples } from "@/lib/features/people/peopleAction";
import { peopleColumns } from "./components/ColumnDef";
import { DataTable } from "./components/DataTable";

export default async function People() {
  const response = await getPeoples();
  const peoples = response?.results;

  return (
    <div>{peoples?.length ? <DataTable columns={peopleColumns} data={peoples} /> : <p>{response.message}</p>}</div>
  );
}
