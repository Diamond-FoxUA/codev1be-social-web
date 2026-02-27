import { NextRequest, NextResponse } from 'next/server';
import serverApi from '@/app/api/api';
import { User } from '@/types/user';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await serverApi.post<User>('/auth/register', body);

  return NextResponse.json(res.data, { status: 201 });
}
