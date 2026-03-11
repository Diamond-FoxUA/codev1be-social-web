'use client';

import css from './PopularStoriesSection.module.css';
import Link from 'next/link';
import { fetchStories, StoriesHttpResponse } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../Skeleton/Skeleton';
// import { Story } from '@/types/story';
import { StoryItem } from './PopularStoryItem';

// type Resp = {
//   stories: Story[];
//   totalStories: number;
//   offset: number;
//   limit: number;
//   hasMore: boolean;
// };

const getStories = async (): Promise<StoriesHttpResponse> => {
  const data = await fetchStories({
    offset: 0,
    limit: 3,
  });

  console.log('POPULAR STORIES COUNT:', data.stories.length);
  console.log(
    'POPULAR STORIES IDS:',
    data.stories.map((story) => story._id),
  );

  return data;
};

export default function PopularStoriesSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stories'],
    queryFn: getStories,
  });

  if (isError) return <p className={css.msg}>Error</p>;

  return (
    <section className="section">
      <div className="container">
        <h2 className={css.sectionTitle}>Популярні історії</h2>

        {isLoading ? (
          <div className={css.loader}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height={397} />
            ))}
          </div>
        ) : (
          <ul className={css.articleList}>
            {data?.stories.map((story) => {
              return <StoryItem key={story._id} story={story} />;
            })}
          </ul>
        )}

        <Link href="/stories" className={css.seeMore}>
          Переглянути всі
        </Link>
      </div>
    </section>
  );
}
