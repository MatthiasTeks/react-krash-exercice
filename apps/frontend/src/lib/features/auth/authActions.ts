'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function authenticate(prevState: unknown, formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');
  
    const response = await fetch(`${process.env.BACKEND_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      return { message: 'Your username and password are as lost as the Death Star plans!' };
    }
  
    const { token } = await response.json();
  
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect('/');
  }

export async function isAuthenticated() {
  const token = cookies().get('token')?.value;
  if (!token) {
    return false;
  }

  return true;
}

export async function logout() {
  cookies().delete('token');

  redirect('/auth');
}