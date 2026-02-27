import { NextResponse } from 'next/server';
import serverApi from '@/app/api/api';

type Context = {
  params: {
    storyId: string;
  };
};

export async function POST(req: Request, { params }: Context) {
  const res = await serverApi.post(`/stories/${params.storyId}/save`);

  return NextResponse.json(res.data);
}

export async function DELETE(req: Request, { params }: Context) {
  await serverApi.delete(`/stories/${params.storyId}/save`);

  return new NextResponse(null, { status: 204 });
}
