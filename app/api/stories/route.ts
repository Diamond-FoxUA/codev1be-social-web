import { NextRequest, NextResponse } from 'next/server';

import serverApi, { ServerApiError } from '@/app/api/api';

import { StoriesHttpResponse } from '@/lib/api/clientApi';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const page = req.nextUrl.searchParams.get('page');

    const perPage = req.nextUrl.searchParams.get('perPage');

    const res = await serverApi.get<StoriesHttpResponse>(
      '/stories',

      {
        params: {
          page,
          perPage,
        },
      },
    );

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

/* ================= CREATE STORY ================= */

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();

    const res = await serverApi.post('/stories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    const err = error as ServerApiError;

    return NextResponse.json(
      { message: err.response?.data?.message || 'Internal server error' },
      { status: err.response?.status || 500 },
    );
  }
}
