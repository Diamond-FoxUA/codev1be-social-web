import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CreateStoryData } from '@/types/story';

interface StoryStore {
  draft: CreateStoryData;
  setDraft: (data: Partial<CreateStoryData>) => void;
  clearDraft: () => void;
}

const initialDraft:  CreateStoryData = {
  title: '',
  description: '',
  category: '',
}

export const useStoryStore = create<StoryStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (data) =>
        set((prev) => ({ draft: { ...prev.draft, ...data } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'story-draft' },
  ),
);
