import { fetchData } from "@/services/api";

export async function getVehicles() {
  return await fetchData('vehicles');
}

export async function getVehicleById(id: string) {
  return await fetchData(`vehicles/${id}`);
}

export async function getVehicleByName(name: string) {
  return await fetchData(`vehicles/search/${name}`);
}