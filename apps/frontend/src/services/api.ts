"use server";

import { cookies } from "next/headers";

export async function fetchData(endpoint: string) {
  const token = cookies().get('token')?.value;
  if (!token) {
    return { message: "Access denied: This site is a no-fly zone for the Empire! 🛸" };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_ENDPOINT}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error fetching data from ${endpoint}:`, errorData);
      return { message: "The Resistance's data centers have been bombed! 🚀" };
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { message: "The Resistance's data centers have been bombed! 🚀" };
  }
}