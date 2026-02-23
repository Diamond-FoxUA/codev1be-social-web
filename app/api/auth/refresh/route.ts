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
  const cookie = req.headers.get('cookie') ?? '';

  const upstream = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { cookie },
  });

  const data = await upstream.json().catch(() => null);
  const res = NextResponse.json(data, { status: upstream.status });

  const setCookie = getSetCookieHeaders(upstream.headers);
  applyDevCookies(res, setCookie);

  return res;
}