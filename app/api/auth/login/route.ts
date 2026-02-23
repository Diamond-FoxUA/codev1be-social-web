import { NextResponse } from 'next/server';
import { applyDevCookies } from '../_cookie';

function getSetCookieHeaders(headers: Headers): string[] | null {
  const maybe = headers as unknown as { getSetCookie?: () => string[] };
  if (typeof maybe.getSetCookie === 'function') {
    const list = maybe.getSetCookie();
    return Array.isArray(list) && list.length ? list : null;
  }
  const single = headers.get('set-cookie');
  return single ? [single] : null;
}

export async function POST(req: Request) {
  const body = await req.json();

  const upstream = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await upstream.json().catch(() => null);
  const res = NextResponse.json(data, { status: upstream.status });

  const setCookie = getSetCookieHeaders(upstream.headers);
  applyDevCookies(res, setCookie);

  return res;
}