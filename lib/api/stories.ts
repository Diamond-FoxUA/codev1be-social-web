import { clientApi } from './client';

import type {
  Story,
  StoriesResponse,
  PaginationParams,
  GetStoriesParams,
  PopularStoriesResponse,
} from '@/types/story';

export const storiesApi = {
  fetchStories: async (params?: GetStoriesParams): Promise<StoriesResponse> => {
    const { data } = await clientApi.get<StoriesResponse>('/stories', {
      params,
    });
    return data;
  },

  getPopularStories: async (): Promise<PopularStoriesResponse> => {
    const { data } =
      await clientApi.get<PopularStoriesResponse>('/stories/popular');
    return data;
  },

  getFavouriteStories: async (
    params?: PaginationParams,
  ): Promise<StoriesResponse> => {
    const { data } = await clientApi.get<StoriesResponse>('/stories/saved', {
      params,
    });

    return data;
  },

  getMyStories: async (params?: PaginationParams): Promise<StoriesResponse> => {
    const { data } = await clientApi.get<StoriesResponse>('/stories/me', {
      params,
    });

    return data;
  },

  getStoryById: async (id: string): Promise<Story> => {
    const { data } = await clientApi.get<Story>(`/stories/${id}`);

    return data;
  },

  createStory: async (formData: FormData): Promise<Story> => {
    const { data } = await clientApi.post<Story>('/stories', formData);

    return data;
  },

  updateStory: async (id: string, formData: FormData): Promise<Story> => {
    const { data } = await clientApi.patch<Story>(`/stories/${id}`, formData);

    return data;
  },

  addToFavorites: async (id: string): Promise<void> => {
    await clientApi.post(`/stories/${id}/save`);
  },

  removeFromFavorites: async (id: string): Promise<void> => {
    await clientApi.delete(`/stories/${id}/save`);
  },
};
