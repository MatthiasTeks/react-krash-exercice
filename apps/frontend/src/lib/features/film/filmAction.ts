'use server'

import { fetchData } from "@/services/api";

export async function getFilms() {
  return await fetchData('films');
}

export async function getFilmById(id: string) {
  return await fetchData(`films/${id}`);
}

export async function getFilmByTitle(title: string) {
  return await fetchData(`films/search/${title}`);
}