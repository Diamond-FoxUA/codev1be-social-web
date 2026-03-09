'use client';

import { useCallback } from 'react';
import styles from './TravellersStories.module.css';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';

import type { StoryCard, StoryCardUser } from '@/types/story';
import { CATEGORY_MAP } from '../StoriesPage/constants';

type Props = {
  stories: StoryCard[];
  usersMap: Record<string, StoryCardUser>;
  categoryMap?: Record<string, string>;
  mode?: 'default' | 'own';
  onUnsave?: (storyId: string) => void;
};

type CategoryObject = {
  _id?: string;
  $oid?: string;
  id?: string;
};

export default function TravellersStories({
  stories,
  usersMap,
  categoryMap,
  mode = 'default',
  onUnsave,
}: Props) {
  const handleUnsave = useCallback(
    (storyId: string) => {
      onUnsave?.(storyId);
    },
    [onUnsave],
  );

  const categories = categoryMap ?? CATEGORY_MAP;

  const uniqueStories = Array.from(
    new Map(stories.map((story) => [story._id, story])).values(),
  );

  return (
    <div className={styles.grid}>
      {uniqueStories.map((story, index) => {
        let user: StoryCardUser | undefined = story.ownerUser;

        if (
          !user &&
          typeof story.ownerId === 'object' &&
          story.ownerId !== null
        ) {
          const owner = story.ownerId as unknown as StoryCardUser;

          user = {
            _id: owner._id,
            name: owner.name,
            avatarUrl: owner.avatarUrl,
          };
        }

        if (!user && typeof story.ownerId === 'string') {
          user = usersMap[story.ownerId];
        }

        let categoryId: string | undefined;

        if (typeof story.category === 'string') {
          categoryId = story.category;
        } else if (
          typeof story.category === 'object' &&
          story.category !== null
        ) {
          const cat = story.category as CategoryObject;
          categoryId = cat._id || cat.$oid || cat.id;
        }

        const categoryName = categories[categoryId as string] || 'Категорія';

        return (
          <TravellersStoriesItem
            key={story._id}
            story={story}
            user={user}
            categoryName={categoryName}
            mode={mode}
            priority={index === 0}
            onUnsave={handleUnsave}
          />
        );
      })}
    </div>
  );
}
