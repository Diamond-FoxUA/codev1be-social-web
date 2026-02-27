import { NextRequest, NextResponse } from 'next/server';
import serverApi from '@/app/api/api';

type Context = {
  params: {
    userId: string;
  };
};

export async function GET(req: NextRequest, { params }: Context) {
  const res = await serverApi.get(`/users/${params.userId}`);

  return NextResponse.json(res.data);
}
