import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookie = req.headers.get('cookie') ?? '';

  const upstream = await fetch(`${process.env.API_URL}/auth/logout`, {
    method: 'POST',
    headers: { cookie },
  });

  const res = new NextResponse(null, { status: upstream.status });

  res.cookies.delete('accessToken');
  res.cookies.delete('refreshToken');
  res.cookies.delete('sessionId');

  return res;
}