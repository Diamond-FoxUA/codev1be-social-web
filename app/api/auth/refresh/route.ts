// import { NextResponse } from 'next/server';
// import serverApi from '@/app/api/api';

// export async function POST() {
//   const res = await serverApi.post('/auth/refresh');

//   return NextResponse.json(res.data);
// }
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import serverApi from '@/app/api/api';
import { User } from '@/types/user';
import { logErrorResponse } from '../../_utils/utils';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.json(null, { status: 200 });
  }

  try {
    const res = await serverApi.get<User>('/users/me');
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401 && refreshToken) {
      try {
        const refreshRes = await serverApi.post<User>('/auth/refresh', {});

        const setCookieHeader = refreshRes.headers['set-cookie'];
        if (setCookieHeader) {
          const cookieArray = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];
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
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax' as const,
            });
          }
        }

        return NextResponse.json(refreshRes.data, { status: 200 });
      } catch (refreshError) {
        if (isAxiosError(refreshError)) {
          logErrorResponse(refreshError.response?.data);
        }
        return NextResponse.json(null, { status: 200 });
      }
    }

function extractCookieValue(setCookie: string, name: string) {
  const match = setCookie.match(new RegExp(`${name}=([^;]+)`));
  return match?.[1];
}

export async function POST() {
  try {
    const cookieHeader = (await cookies())
      .getAll()
      // можно отфильтровать лишнее, чтобы не слать __next_hmr_refresh_hash__
      .filter((c) =>
        ['accessToken', 'refreshToken', 'sessionId'].includes(c.name),
      )
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const upstream = await serverApi.post(
      '/auth/refresh',
      {},
      { headers: cookieHeader ? { cookie: cookieHeader } : {} },
    );

    // забираем Set-Cookie от backend
    const setCookie = upstream.headers['set-cookie'] ?? [];
    const arr = Array.isArray(setCookie) ? setCookie : [setCookie];

    const accessRaw = arr
      .map((s) => extractCookieValue(s, 'accessToken'))
      .find(Boolean);
    const refreshRaw = arr
      .map((s) => extractCookieValue(s, 'refreshToken'))
      .find(Boolean);
    const sessionRaw = arr
      .map((s) => extractCookieValue(s, 'sessionId'))
      .find(Boolean);

    const access = accessRaw ? decodeURIComponent(accessRaw) : undefined;
    const refresh = refreshRaw ? decodeURIComponent(refreshRaw) : undefined;
    const session = sessionRaw ? decodeURIComponent(sessionRaw) : undefined;

    const secure = process.env.NODE_ENV === 'production';

    const response = NextResponse.json(upstream.data, {
      status: upstream.status,
    });

    // IMPORTANT: обновляем cookies на домене фронта
    if (access) {
      response.cookies.set('accessToken', access, {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
      });
    }
    if (refresh) {
      response.cookies.set('refreshToken', refresh, {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
      });
    }
    if (session) {
      response.cookies.set('sessionId', session, {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
      });
    }

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return NextResponse.json(
        err.response?.data ?? { message: 'Unauthorized' },
        { status: err.response?.status ?? 401 },
      );
    }
    return NextResponse.json({ message: 'Refresh failed' }, { status: 500 });
  }
}
