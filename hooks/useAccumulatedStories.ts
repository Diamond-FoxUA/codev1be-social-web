import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { Story, StoryCard } from '@/types/story';
import type { StoriesHttpResponse } from '@/lib/api/clientApi';

const toStoryCard = (story: Story): StoryCard => ({
  ...story,
  category:
    typeof story.category === 'string' ? story.category : story.category.name,
  ownerId:
    typeof story.ownerId === 'string' ? story.ownerId : story.ownerId._id,
});

interface UseAccumulatedStoriesProps {
  queryKey: string[];
  queryFn: (page: number, perPage: number) => Promise<StoriesHttpResponse>;
  perPage?: number;
}

export function useAccumulatedStories({
  queryKey,
  queryFn,
  perPage = 6,
}: UseAccumulatedStoriesProps) {
  const [page, setPage] = useState(1);
  const [accStories, setAccStories] = useState<StoryCard[]>([]);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [...queryKey, page],
    queryFn: async () => {
      const result = await queryFn(page, perPage);
      const cards = result.stories.map(toStoryCard);
      setAccStories((prev) => (page === 1 ? cards : [...prev, ...cards]));
      return result;
    },
    placeholderData: keepPreviousData,
  });

  const loadMore = () => setPage((p) => p + 1);
  const hasMore = page < (data?.totalPages ?? 1);

  return { accStories, isLoading, isError, isFetching, hasMore, loadMore };
}
