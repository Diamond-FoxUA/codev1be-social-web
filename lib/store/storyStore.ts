import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateStoryData } from '@/types/story';

const initialDraft: CreateStoryData = {
  title: '',
  description: '',
  category: '',
  img: null,
};
interface StoryStore {
  draft: CreateStoryData;
  setDraft: (note: Partial<CreateStoryData>) => void;
  clearDraft: () => void;
}

export const useStoryStore = create<StoryStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((prev) => ({ draft: { ...prev.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'story-draft' },
  ),
);
