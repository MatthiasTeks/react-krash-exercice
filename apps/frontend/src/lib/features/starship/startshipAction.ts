import { fetchData } from "@/services/api";

export async function getStarships() {
  return await fetchData('starships');
}

export async function getStarshipById(id: string) {
  return await fetchData(`starships/${id}`);
}

export async function getStarshipByName(name: string) {
  return await fetchData(`starships/search/${name}`);
}