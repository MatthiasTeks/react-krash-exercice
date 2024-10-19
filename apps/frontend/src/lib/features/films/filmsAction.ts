'use server'

import { cookies } from "next/headers";

export async function getFilms() {
    const token = cookies().get('token')?.value;
    if (!token) {
        return { message: "Access denied: This site is a no-fly zone for the Empire! 🛸" };
    }

    try {
        const response = await fetch(`${process.env.BACKEND_ENDPOINT}/films`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching films:', errorData);
            return { message: "The Resistance's data centers have been bombed! 🚀" };
        }

        const films = await response.json();
        return films;
    } catch (error) {
        console.error('Error:', error);
        return { message: "The Resistance's data centers have been bombed! 🚀" };
    }
}

export async function getFilmById(id: string) {
    const token = cookies().get('token')?.value;
    if (!token) {
        return { message: "Access denied: This site is a no-fly zone for the Empire! 🛸" };
    }

    try {
        const response = await fetch(`${process.env.BACKEND_ENDPOINT}/films/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching films:', errorData);
            return { message: "The Resistance's data centers have been bombed! 🚀" };
        }

        const films = await response.json();
        return [films];
    } catch (error) {
        console.error('Error:', error);
        return { message: "The Resistance's data centers have been bombed! 🚀" };
    }
}

export async function getFilmByTitle(title: string) {
    const token = cookies().get('token')?.value;
    if (!token) {
        return { message: "Access denied: This site is a no-fly zone for the Empire! 🛸" };
    }

    try {
        const response = await fetch(`${process.env.BACKEND_ENDPOINT}/films/search/${title}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching films:', errorData);
            return { message: "The Resistance's data centers have been bombed! 🚀" };
        }

        const films = await response.json();
        console.log("render: ", films.results)
        return films.results;
    } catch (error) {
        console.error('Error:', error);
        return { message: "The Resistance's data centers have been bombed! 🚀" };
    }
}