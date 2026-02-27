import { NextRequest, NextResponse } from 'next/server';
import serverApi from '@/app/api/api';

type Context = {
  params: {
    storyId: string;
  };
};

export async function GET(req: NextRequest, { params }: Context) {
  const res = await serverApi.get(`/stories/${params.storyId}`);

  return NextResponse.json(res.data);
}

export async function PATCH(req: NextRequest, { params }: Context) {
  const formData = await req.formData();

  const res = await serverApi.patch(`/stories/${params.storyId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return NextResponse.json(res.data);
}
