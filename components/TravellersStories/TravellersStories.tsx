'use client';

import styles from './TravellersStories.module.css';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';


interface Story {
  _id: string;
  img: string;
  title: string;
  article?: string;
  description?: string;
  category: string;
  ownerId: string;
  ownerUser?: User;
  favoriteCount: number;
  date: string;
}

interface User {
  _id: string;
  name: string;
  avatarUrl: string;
  totalFavorites: number;
}

interface TravellersStoriesProps {
  stories: Story[];
  usersMap: Record<string, User>;
  categoryMap: Record<string, string>;
  mode?: "default" | "own"; // ДОБАВИЛИ, ЧТОБЫ РАЗЛИЧАТЬ РЕЖИМЫ
}

export default function TravellersStories({
  stories,
  usersMap,
  categoryMap,
  mode = "default", // ПО УМОЛЧАНИЮ
}: TravellersStoriesProps) {
  return (
    <div className={styles.grid}>
      {stories.map((story, index) => (
        <TravellersStoriesItem
          key={`${story._id}-${index}`}
          story={story}
          user={story.ownerUser || usersMap[story.ownerId]}
          categoryName={categoryMap[story.category] || 'Категорія'}
          mode={mode}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
