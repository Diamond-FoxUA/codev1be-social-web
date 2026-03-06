import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ['/profile', '/stories/create'];
const publicRoutes = ['/login', '/register'];

function extractCookieValue(setCookie: string, name: string) {
  const match = setCookie.match(new RegExp(`${name}=([^;]+)`));
  return match?.[1];
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPrivateRoute =
    privateRoutes.some((route) => pathname.startsWith(route)) ||
    /^\/stories\/[^/]+\/edit$/.test(pathname);

  // ACCESS TOKEN Є
  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  // ACCESS TOKEN НЕМАЄ, АЛЕ Є REFRESH TOKEN
  if (!accessToken && refreshToken) {
    const data = await checkServerSession();
    const setCookies = data.headers.getSetCookie();

    if (setCookies.length > 0) {
      const response = NextResponse.next();

      for (const cookieStr of setCookies) {
        // ✅ Правильно витягуємо значення з Set-Cookie заголовку
        const accessTokenValue = extractCookieValue(cookieStr, 'accessToken');
        const refreshTokenValue = extractCookieValue(cookieStr, 'refreshToken');
        const sessionIdValue = extractCookieValue(cookieStr, 'sessionId');

        // Декодуємо значення (можуть бути URL-encoded)
        const access = accessTokenValue ? decodeURIComponent(accessTokenValue) : null;
        const refresh = refreshTokenValue ? decodeURIComponent(refreshTokenValue) : null;
        const session = sessionIdValue ? decodeURIComponent(sessionIdValue) : null;

        const secure = process.env.NODE_ENV === 'production';

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
      }

      if (isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return response;
    }
  }

  // НЕ АВТОРИЗОВАНИЙ
  if (isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/stories/create',
    '/stories/:storyId/edit',
    '/login',
    '/register',
  ],
};
