import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError, AxiosResponse } from 'axios';
import serverApi from '@/app/api/api';

async function syncCookies(apiRes: AxiosResponse): Promise<void> {
  const setCookieHeader = apiRes.headers['set-cookie'];
  if (!setCookieHeader) return;

  const cookieStore = await cookies();
  const cookieArray = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];
  const isProd = process.env.NODE_ENV === 'production';

  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);
    const allKeys = Object.keys(parsed);
    const cookieName = allKeys[0];
    const cookieValue = parsed[cookieName];

    if (!cookieName || !cookieValue) continue;

    cookieStore.set(cookieName, cookieValue, {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path || '/',
      maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
    });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false }, { status: 200 });
  }

  try {
    const res = await serverApi.post('/auth/refresh', {});
    await syncCookies(res);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

export async function POST() {
  try {
    const res = await serverApi.post('/auth/refresh', {});
    await syncCookies(res);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
