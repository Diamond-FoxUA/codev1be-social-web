import { User } from "@/types/user"

interface TravellersResponse {
  items: User[];
  hasMore: boolean;
}

interface GetTravellersParams {
  page?: number;
  limit?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTravellers(
  params: GetTravellersParams
): Promise<TravellersResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.append("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.append("limit", String(params.limit));
  }

  const res = await fetch(
    `${BASE_URL}/travellers?${searchParams.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to load travellers");
  }

  return res.json();
}



