import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import serverApi from '@/app/api/api';

export async function POST() {
  const cookieStore = await cookies();

  try {
    await serverApi.post('/auth/logout');
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Backend logout failed:', error.response?.data);
    }
  }

  const response = NextResponse.json(
    { message: 'Logged out' },
    { status: 200 },
  );

  const cookiesToDelete = ['accessToken', 'refreshToken', 'sessionId'];

  cookiesToDelete.forEach((name) => {
    cookieStore.delete(name);
  });

  return response;
}
