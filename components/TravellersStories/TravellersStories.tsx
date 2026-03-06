'use client';

import { useCallback } from 'react';
import styles from './TravellersStories.module.css';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';

import type { StoryCard, StoryCardUser } from '@/types/story';

type Props = {
  stories: StoryCard[];
  usersMap: Record<string, StoryCardUser>;
  categoryMap: Record<string, string>;
  mode?: 'default' | 'own';
  onUnsave?: (storyId: string) => void;
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

  return (
    <div className={styles.grid}>
      {stories.map((story, index) => {
        let user: StoryCardUser | undefined = story.ownerUser;

        // якщо ownerUser немає, але ownerId прийшов як об'єкт (mongoose populate)
        if (!user && typeof story.ownerId === 'object') {
          const owner = story.ownerId as unknown as StoryCardUser;

          user = {
            _id: owner._id,
            name: owner.name,
            avatarUrl: owner.avatarUrl,
          };
        }

        // fallback через usersMap
        if (!user) {
          user = usersMap[story.ownerId as string];
        }

        return (
          <TravellersStoriesItem
            key={story._id}
            story={story}
            user={user}
            categoryName={categoryMap[story.category] || 'Категорія'}
            mode={mode}
            priority={index === 0}
            onUnsave={handleUnsave}
          />
        );
      })}
    </div>
  );
}
