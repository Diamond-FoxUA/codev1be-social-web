'use client';

import { useCallback, useEffect, useState } from 'react';
import css from './PopularStoriesSection.module.css';
import Link from 'next/link';
import { fetchStories, StoriesHttpResponse } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../Skeleton/Skeleton';
import { StoryItem } from './PopularStoryItem';

const getPopularLimit = () => {
  const isTablet = window.matchMedia(
    '(min-width: 768px) and (max-width: 1439px)',
  ).matches;

  return isTablet ? 4 : 3;
};

export default function PopularStoriesSection() {
  const [limit, setLimit] = useState(3);
  const [isReady, setIsReady] = useState(false);

  const updateLimit = useCallback(() => {
    const nextLimit = getPopularLimit();
    setLimit(nextLimit);
    setIsReady(true);
  }, []);

  useEffect(() => {
    updateLimit();
    window.addEventListener('resize', updateLimit);

    return () => window.removeEventListener('resize', updateLimit);
  }, [updateLimit]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['popular-stories', limit],
    queryFn: async (): Promise<StoriesHttpResponse> =>
      fetchStories({
        offset: 0,
        limit,
      }),
    enabled: isReady,
  });

  if (isError) return <p className={css.msg}>Error</p>;

  return (
    <section className="section">
      <div className="container">
        <h2 className={css.sectionTitle}>Популярні історії</h2>

        {isLoading ? (
          <div className={css.loader}>
            {Array.from({ length: limit }).map((_, i) => (
              <Skeleton key={i} height={397} />
            ))}
          </div>
        ) : (
          <ul className={css.articleList}>
            {data?.stories.map((story) => (
              <StoryItem key={story._id} story={story} />
            ))}
          </ul>
        )}

        <Link href="/stories" className={css.seeMore}>
          Переглянути всі
        </Link>
      </div>
    </section>
  );
}
