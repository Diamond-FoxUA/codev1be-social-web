import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;

  const { pathname } = req.nextUrl;

  // PRIVATE ROUTES
  const isPrivateRoute =
    pathname.startsWith('/profile') ||
    pathname === '/stories/create' ||
    pathname === '/edit' ||
    (pathname.startsWith('/stories/') && pathname.endsWith('/edit'));

  // GUEST ONLY ROUTES
  const isGuestRoute = pathname === '/login' || pathname === '/register';

  // guest → private → redirect login
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // auth → login/register → redirect home
  if (accessToken && isGuestRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/stories/create',
    '/stories/:storyId/edit',
    '/edit',
    '/login',
    '/register',
  ],
};
