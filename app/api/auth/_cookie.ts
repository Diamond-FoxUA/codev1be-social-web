import { NextResponse } from 'next/server';

function parseSetCookie(header: string) {
  const [pair, ...attrs] = header.split(';').map((s) => s.trim());
  const eq = pair.indexOf('=');
  const name = pair.slice(0, eq);
  const value = pair.slice(eq + 1);

  const lowerAttrs = attrs.map((a) => a.toLowerCase());

  const maxAgeAttr = attrs.find((a) => a.toLowerCase().startsWith('max-age='));
  const maxAge = maxAgeAttr ? Number(maxAgeAttr.split('=')[1]) : undefined;

  const httpOnly = lowerAttrs.includes('httponly');

  return { name, value, maxAge, httpOnly };
}

export function applyDevCookies(res: NextResponse, setCookieHeaders: string[] | null) {
  if (!setCookieHeaders?.length) return;

  for (const h of setCookieHeaders) {
    const c = parseSetCookie(h);

    if (!['accessToken', 'refreshToken', 'sessionId'].includes(c.name)) continue;

    res.cookies.set({
      name: c.name,
      value: c.value,
      httpOnly: c.httpOnly,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: c.maxAge,
    });
  }
}