'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import nextServer from '@/lib/api/api';
import styles from './StoriesPage.module.css';

type StoryCategory = string | { _id: string; name?: string };
type StoryOwner = string | User;

interface Story {
  _id: string;
  img: string;
  title: string;
  article?: string;
  category: StoryCategory;
  ownerId: StoryOwner;
  favoriteCount: number;
  date: string;
}

type NormalizedStory = Omit<Story, 'category' | 'ownerId'> & {
  category: string;
  ownerId: string;
  ownerUser?: User;
};

interface User {
  _id: string;
  name: string;
  avatarUrl: string;
  totalFavorites: number;
}

interface ApiResponse {
  stories: Story[];
  totalStories: number;
  page: number;
  perPage: number;
  totalPages: number;
}

interface UsersResponse {
  users: User[];
  totalUsers: number;
  page: number;
  perPage: number;
  totalPages: number;
}

const CATEGORIES = [
  { id: 'all', name: 'Всі історії' },
  { id: '68fb50c80ae91338641121f2', name: 'Європа' },
  { id: '68fb50c80ae91338641121f0', name: 'Азія' },
  { id: '68fb50c80ae91338641121f6', name: 'Пустелі' },
  { id: '68fb50c80ae91338641121f4', name: 'Африка' },
];

const CATEGORY_MAP: Record<string, string> = {
  '68fb50c80ae91338641121f2': 'Європа',
  '68fb50c80ae91338641121f0': 'Азія',
  '68fb50c80ae91338641121f6': 'Пустелі',
  '68fb50c80ae91338641121f4': 'Африка',
  '68fb50c80ae91338641121f3': 'Америка',
  '68fb50c80ae91338641121f1': 'Кавказ',
  '68fb50c80ae91338641121f7': 'Кавказ',
  '68fb50c80ae91338641121f8': 'Океанія',
  '68fb50c80ae91338641121f9': 'Балкани',
};

export default function StoriesPage() {
  const getBaseDisplayCount = () => {
    if (typeof window === 'undefined') return 9;
    return window.matchMedia('(min-width: 768px) and (max-width: 1439px)')
      .matches
      ? 8
      : 9;
  };

  const [baseDisplayCount, setBaseDisplayCount] = useState(getBaseDisplayCount);
  const [displayCount, setDisplayCount] = useState(getBaseDisplayCount);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pageSize = baseDisplayCount;

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(min-width: 768px) and (max-width: 1439px)',
    );

    const handleChange = () => {
      const nextBase = mediaQuery.matches ? 8 : 9;
      setBaseDisplayCount(nextBase);
      setDisplayCount(nextBase);
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getCategoryId = (category: StoryCategory) =>
    typeof category === 'string' ? category : category?._id || '';

  const getOwnerId = (owner: StoryOwner) =>
    typeof owner === 'string' ? owner : owner?._id || '';

  const getOwnerUser = (owner: StoryOwner) =>
    typeof owner === 'string' ? undefined : owner;

  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ApiResponse>({
      queryKey: ['stories', selectedCategory, pageSize],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await nextServer.get('/stories', {
          params: {
            page: pageParam,
            perPage: pageSize,
            ...(selectedCategory !== 'all'
              ? { category: selectedCategory }
              : {}),
          },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      staleTime: 0,
    });

  const { data: usersData } = useQuery<UsersResponse>({
    queryKey: ['users'],
    queryFn: async () => {
      const pages = await Promise.all([
        nextServer.get('/users', { params: { page: 1, perPage: 9 } }),
        nextServer.get('/users', { params: { page: 2, perPage: 9 } }),
        nextServer.get('/users', { params: { page: 3, perPage: 9 } }),
        nextServer.get('/users', { params: { page: 4, perPage: 9 } }),
        nextServer.get('/users', { params: { page: 5, perPage: 9 } }),
      ]);

      const allUsers = pages.flatMap(
        (response: AxiosResponse<UsersResponse>) => response.data.users || [],
      );

      return {
        users: allUsers,
        totalUsers: pages[0].data.totalUsers,
        page: 1,
        perPage: allUsers.length,
        totalPages: pages[0].data.totalPages,
      };
    },
  });

  const usersMap = useMemo(() => {
    const map: Record<string, User> = {};
    usersData?.users?.forEach((user) => {
      map[user._id] = user;
    });
    return map;
  }, [usersData?.users]);

  const normalizedStories: NormalizedStory[] = useMemo(() => {
    const allStories = data?.pages.flatMap((page) => page.stories) || [];
    return allStories.map((story) => ({
      ...story,
      category: getCategoryId(story.category),
      ownerId: getOwnerId(story.ownerId),
      ownerUser: getOwnerUser(story.ownerId),
    }));
  }, [data?.pages]);

  const displayedStories = normalizedStories.slice(0, displayCount);
  const totalStories = data?.pages[0]?.totalStories || 0;
  const hasMoreStories = displayCount < totalStories;

  const handleLoadMore = () => {
    const nextDisplayCount = displayCount + 3;
    setDisplayCount(nextDisplayCount);

    // Підвантажити наступну сторінку, якщо завантажених історій не вистачає
    if (nextDisplayCount > normalizedStories.length && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setDisplayCount(baseDisplayCount);
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.sectionTitle}>Історії Мандрівників</h1>

        <div className={styles.filterSection}>
          <p className={styles.filterHeading}>Категорії</p>

          <div className={styles.filterDropdown}>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={styles.filterSelect}
            >
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9998 15.2019C11.8878 15.2019 11.7822 15.1813 11.683 15.1399C11.5837 15.0986 11.4884 15.0323 11.397 14.9409L6.45305 9.99694C6.28305 9.82694 6.20221 9.62385 6.21055 9.38769C6.21888 9.15152 6.30805 8.94844 6.47805 8.77844C6.64805 8.60844 6.85113 8.52344 7.0873 8.52344C7.32346 8.52344 7.52655 8.60844 7.69655 8.77844L11.9998 13.1067L16.328 8.77844C16.498 8.60844 16.697 8.5276 16.9248 8.53594C17.1526 8.54427 17.3515 8.63344 17.5215 8.80344C17.6915 8.97344 17.7765 9.17652 17.7765 9.41269C17.7765 9.64885 17.6915 9.85194 17.5215 10.0219L12.6025 14.9409C12.5112 15.0323 12.4159 15.0986 12.3165 15.1399C12.2174 15.1813 12.1118 15.2019 11.9998 15.2019Z"
                fill="black"
                fillOpacity="0.6"
              />
            </svg>
          </div>

          <div className={styles.filterTabs}>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`${styles.filterBtn} ${
                  selectedCategory === category.id ? styles.filterBtnActive : ''
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {isLoading && <p className={styles.loading}>Завантаження...</p>}
        {error && <p className={styles.error}>Помилка завантаження історій</p>}

        {normalizedStories.length > 0 && (
          <>
            <TravellersStories
              stories={displayedStories}
              usersMap={usersMap}
              categoryMap={CATEGORY_MAP}
            />

            {hasMoreStories && (
              <button
                type="button"
                className={styles.loadMoreBtn}
                onClick={handleLoadMore}
              >
                Показати ще
              </button>
            )}
          </>
        )}

        {!isLoading && normalizedStories.length === 0 && (
          <p className={styles.noResults}>Немає історій в цій категорії</p>
        )}
      </div>
    </section>
  );
}
