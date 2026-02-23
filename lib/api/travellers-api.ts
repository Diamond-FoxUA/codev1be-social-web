import axios from "axios";
import { User } from "@/types/user";

interface TravellersResponse {
  page: number;
  perPage: number;
  totalAuthors: number;
  totalPages: number;
  users: User[];
}

interface GetTravellersParams {
  page?: number;
  perPage?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTravellers(
  params: GetTravellersParams
): Promise<TravellersResponse> {
  try {
    const res = await axios.get<TravellersResponse>(`${BASE_URL}/api/users`, {
      params: {
        page: params.page,
        perPage: params.perPage,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Failed to load travellers", error);
    throw new Error("Failed to load travellers");
  }
}



