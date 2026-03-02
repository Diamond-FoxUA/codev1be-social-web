'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './TravellersStoriesItem.module.css';

interface Story {
  _id: string;
  img: string;
  title: string;
  article?: string;
  description?: string;
  category: string;
  ownerId: string;
  favoriteCount: number;
  date: string;
}

interface User {
  _id: string;
  name: string;
  avatarUrl: string;
  totalFavorites: number;
}

interface TravellersStoriesItemProps {
  story: Story;
  user?: User;
  categoryName: string;
  priority?: boolean;
  mode?: 'default' | 'own';   // 👈 ДОБАВИЛИ
}

export default function TravellersStoriesItem({
  story,
  user,
  categoryName,
  priority = false,
  mode = 'default',          // 👈 ПО УМОЛЧАНИЮ
}: TravellersStoriesItemProps) {
  const articleText = story.article || story.description || '';

  const formattedDate = new Date(story.date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const readTime = Math.ceil(articleText.split(' ').length / 200);

  return (
    <article className={styles.blogCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={story.img}
          alt={story.title}
          fill
          className={styles.image}
          sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 33vw"
          priority={priority}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.contentCard}>
          <span className={styles.tag}>{categoryName}</span>
          <h3 className={styles.title}>{story.title}</h3>
          <p className={styles.description}>
            {articleText.substring(0, 80) || 'Опис відсутній'}...
          </p>
        </div>

        <div className={styles.author}>
          <div className={styles.avatar}>
            {user?.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                fill
                className={styles.avatarImage}
                sizes="48px"
              />
            ) : null}
          </div>

          <div className={styles.authorInfo}>
            <span className={styles.authorName}>
              {user?.name || 'Автор'}
            </span>
            <div className={styles.time}>
              <span className={styles.date}>{formattedDate}</span>
              <span className={styles.divider}>•</span>
              <span>{readTime} хв</span>
            </div>
          </div>
        </div>

        {/* 🔥 ACTIONS */}
        <div className={styles.actions}>

          {/* Кнопка просмотра */}
          <Link
            href={`/stories/${story._id}`}
            className={styles.readBtn}
          >
            Переглянути статтю
          </Link>

          {/* 👇 Если это Мои истории — показываем Edit */}
          {mode === 'own' ? (
            <Link
              href={`/stories/${story._id}/edit`}
              className={styles.bookmarkBtn}
            >
              Редагувати
            </Link>
          ) : (
            // Иначе обычный bookmark
            <button type="button" className={styles.bookmarkBtn}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 18L7 20V4H17V20L12 18Z"
                  fill="black"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}