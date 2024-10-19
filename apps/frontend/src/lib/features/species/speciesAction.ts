import { fetchData } from "@/services/api";

export async function getSpecies() {
  return await fetchData('species');
}

export async function getSpeciesById(id: string) {
  return await fetchData(`species/${id}`);
}

export async function getSpeciesByName(name: string) {
  return await fetchData(`species/search/${name}`);
}