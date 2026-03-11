import { NextRequest, NextResponse } from 'next/server';
import serverApi, { ServerApiError } from '@/app/api/api';
import { Story } from '@/types/story';

type StoriesHttpResponse = {
  stories: Story[];
  totalStories: number;
  offset: number;
  limit: number;
  hasMore: boolean;
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const offset = req.nextUrl.searchParams.get('offset');
    const limit = req.nextUrl.searchParams.get('limit');
    const category = req.nextUrl.searchParams.get('category');

    const res = await serverApi.get<StoriesHttpResponse>('/stories', {
      params: {
        ...(offset ? { offset } : {}),
        ...(limit ? { limit } : {}),
        ...(category ? { category } : {}),
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    const err = error as ServerApiError;

    return NextResponse.json(
      {
        message: err.response?.data?.message || 'Internal server error',
      },
      {
        status: err.response?.status || 500,
      },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();

    const res = await serverApi.post<Story>('/stories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json(res.data, { status: 201 });
  } catch (error) {
    const err = error as ServerApiError;

    return NextResponse.json(
      { message: err.response?.data?.message || 'Failed to create story' },
      { status: err.response?.status || 500 },
    );
  }
}
