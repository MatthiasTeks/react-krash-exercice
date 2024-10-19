import { fetchData } from "@/services/api";

export async function getPlanets() {
  return await fetchData('planets');
}

export async function getPlanetById(id: string) {
  return await fetchData(`planets/${id}`);
}

export async function getPlanetByName(name: string) {
  return await fetchData(`planets/search/${name}`);
}