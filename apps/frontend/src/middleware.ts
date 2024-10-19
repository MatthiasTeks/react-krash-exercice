import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  const response = await fetch(`${process.env.BACKEND_ENDPOINT}/verify-token`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { valid } = await response.json();

  if (valid) {
    return NextResponse.next();
  } else {
    const res = NextResponse.redirect(new URL('/auth', request.url));
    res.cookies.set('token', '', { maxAge: 0 });
    return res;
  }
}

export const config = {
  matcher: ['/films/:path*', '/planets/:path*', '/species/:path*', '/starships/:path*', '/vehicles/:path*'],
};