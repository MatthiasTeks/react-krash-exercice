import { fetchData } from "@/services/api";

export async function getPeoples() {
  return await fetchData('people');
}

export async function getPersonById(id: string) {
  return await fetchData(`people/${id}`);
}

export async function getPersonByName(name: string) {
  return await fetchData(`people/search/${name}`);
}