import { getVehicles } from "@/lib/features/vehicle/vehicleAction";
import { vehicleColumns } from "./components/ColumnDef";
import { DataTable } from "./components/DataTable";

export default async function Vehicle() {
  const response = await getVehicles();
  const vehicles = response?.results;

  return (
    <div>{vehicles?.length ? <DataTable columns={vehicleColumns} data={vehicles} /> : <p>{response.message}</p>}</div>
  );
}
