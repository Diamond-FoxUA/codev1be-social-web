import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft: CreateStoryData = {
  title: '',
  description: '',
  category: '',
};
interface StoryStore {
  draft: CreateStoryData;
  setDraft: (story: Partial<CreateStoryData>) => void;
  clearDraft: () => void;
}

const initialDraft:  CreateStoryData = {
  title: '',
  article: '',
  category: '',
}

export const useStoryStore = create<StoryStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (story) =>
        set((prev) => ({ draft: { ...prev.draft, ...story } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'story-draft' },
  ),
);
