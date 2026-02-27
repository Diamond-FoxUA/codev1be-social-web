import { nextServer } from './api'; // Шлях до вашого axios екземпляра
import type { Story, CreateStoryData, UpdateStoryData } from '@/types/story'; // Тип, який ми створювали раніше
import type { User } from '@/types/user';

// --- Типи для запитів ---
export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

// --- AUTH API ---
export const register = async (userData: RegisterRequest): Promise<User> => {
  const { data } = await nextServer.post('/auth/register', userData);
  return data;
};

export const login = async (credentials: LoginRequest): Promise<User> => {
  const { data } = await nextServer.post('/auth/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get('/users/me'); // Або /auth/me залежно від бекенду
  return data;
};

// --- STORIES API (на майбутнє для Історій) ---
export const fetchStories = async () => {
  const { data } = await nextServer.get('/stories');
  return data;
};

export const getStoryById = async (storyId: string): Promise<Story> => {
  const { data } = await nextServer.get(`/api/stories/${storyId}`);
  return data;
};

export async function createStory(payload: CreateStoryData) {
  //  multer => FormData
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'img' && value instanceof File) {
      formData.append('storyImage', value); // Мапим img -> storyImage для бeка
    } else if (value !== null && value !== undefined) {
      formData.append(key, value as string);
    }
  });

  const { data } = await nextServer.post<Story>('api/stories', formData);
  return data;
}

export async function updateStory(payload: UpdateStoryData, storyId: string) {
  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('description', payload.description);
  formData.append('category', payload.category);

  if (payload.img instanceof File) {
    formData.append('storyImage', payload.img);
  } else if (typeof payload.img === 'string') {
    formData.append('img', payload.img);
  }

  const { data } = await nextServer.patch<Story>(
    `/api/stories/${storyId}`,
    formData,
  );
  return data;
}

export const saveStory = async (storyId: string) => {
  return nextServer.post(`/api/stories/${storyId}/save`);
};

// Ендпоінт для "Збереженого" (те, що ми писали на бекенді)
export const toggleFavorite = async (
  storyId: string,
  method: 'post' | 'delete',
) => {
  const { data } = await nextServer[method](`/stories/saved/${storyId}`);
  return data;
};
