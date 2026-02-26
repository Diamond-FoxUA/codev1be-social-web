import { nextServer } from './api';
import type { Story, CreateStoryData } from '@/types/story'; 
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

export async function createStory(payload: CreateStoryData) {
  const { data } = await nextServer.post<Story>('api/stories', payload);
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
