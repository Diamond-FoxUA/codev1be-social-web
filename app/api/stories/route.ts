import { NextRequest, NextResponse } from 'next/server';
import serverApi, { ServerApiError } from '@/app/api/api';
import { StoriesHttpResponse } from '@/lib/api/clientApi';
import { Story } from '@/types/story';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const page = req.nextUrl.searchParams.get('page');
    const perPage = req.nextUrl.searchParams.get('perPage');
    const offset = req.nextUrl.searchParams.get('offset');
    const limit = req.nextUrl.searchParams.get('limit');
    const category = req.nextUrl.searchParams.get('category');

    const res = await serverApi.get<StoriesHttpResponse>('/stories', {
      params: {
        ...(page ? { page } : {}),
        ...(perPage ? { perPage } : {}),
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
