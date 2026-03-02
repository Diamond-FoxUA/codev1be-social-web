import nextServer from '@/lib/api/api';
import type { User } from '@/types/user';
import type { Story } from '@/types/story';

/* -------- TYPES -------- */
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

export interface TravellersStoriesResponse {
  stories: Story[];
  totalStories: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/* -------- USERS -------- */

// Всі мандрівники через nextServer
export async function getTravellers(
  params: GetTravellersParams
): Promise<TravellersResponse> {
  const response = await nextServer.get<TravellersResponse>('/users', { params });
  return response.data;
}

// Один мандрівник по id через nextServer
export async function getTravellerById(travellerId: string): Promise<User> {
  const response = await nextServer.get<{ user: User }>(`/users/${travellerId}`);
  return response.data.user;
}

/* -------- STORIES -------- */

export async function getTravellerStories({
  ownerId,
  page = 1,
  perPage = 6,
}: {
  ownerId: string;
  page?: number;
  perPage?: number;
}): Promise<TravellersStoriesResponse> {
  const response = await nextServer.get<TravellersStoriesResponse>('/stories', {
    params: { ownerId, page, perPage },
  });
  return response.data;
}