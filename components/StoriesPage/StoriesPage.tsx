'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import nextServer from '@/lib/api/api';
import type { Category, Owner, StoryCard, StoryCardUser } from '@/types/story';

import styles from './StoriesPage.module.css';
import { CATEGORIES, CATEGORY_MAP } from './constants';

type StoryCategory = string | Category;
type StoryOwner = string | Owner | StoryCardUser;

type ApiStory = Omit<StoryCard, 'category' | 'ownerId' | 'ownerUser'> & {
  category: StoryCategory;
  ownerId: StoryOwner;
};

type ApiResponse = {
  stories: ApiStory[];
  totalStories: number;
  offset: number;
  limit: number;
  hasMore: boolean;
};

type NormalizedStory = StoryCard;

const getCategoryId = (category: StoryCategory) =>
  typeof category === 'string' ? category : category?._id || '';

const getOwnerId = (owner: StoryOwner) =>
  typeof owner === 'string' ? owner : owner?._id || '';

const getOwnerUser = (owner: StoryOwner) =>
  typeof owner === 'string' ? undefined : owner;

const getPaginationConfig = () => {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const isTablet = window.matchMedia(
    '(min-width: 768px) and (max-width: 1439px)',
  ).matches;

  if (isMobile) {
    return {
      device: 'mobile',
      initialLimit: 9,
      nextLimit: 6,
    };
  }

  if (isTablet) {
    return {
      device: 'tablet',
      initialLimit: 8,
      nextLimit: 8,
    };
  }

  return {
    device: 'desktop',
    initialLimit: 9,
    nextLimit: 9,
  };
};

export default function StoriesPage() {
  const [allStories, setAllStories] = useState<NormalizedStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasMoreStories, setHasMoreStories] = useState(false);
  const [initialLimit, setInitialLimit] = useState(9);
  const [nextLimit, setNextLimit] = useState(9);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const prevLengthRef = useRef(0);

  const updatePaginationConfig = useCallback(() => {
    const config = getPaginationConfig();

    console.log('DEVICE:', config.device);
    console.log('INITIAL LIMIT:', config.initialLimit);
    console.log('NEXT LIMIT:', config.nextLimit);

    setInitialLimit(config.initialLimit);
    setNextLimit(config.nextLimit);
    setIsReady(true);
  }, []);

  useEffect(() => {
    updatePaginationConfig();
    window.addEventListener('resize', updatePaginationConfig);

    return () => window.removeEventListener('resize', updatePaginationConfig);
  }, [updatePaginationConfig]);

  const loadStories = useCallback(
    async ({
      offset,
      limit,
      replace = false,
    }: {
      offset: number;
      limit: number;
      replace?: boolean;
    }) => {
      if (!isReady) return;

      setLoading(true);

      try {
        console.log('REQUEST PARAMS:', {
          offset,
          limit,
          category: selectedCategory,
          replace,
        });

        const response = await nextServer.get<ApiResponse>('/stories', {
          params: {
            offset,
            limit,
            ...(selectedCategory !== 'all'
              ? { category: selectedCategory }
              : {}),
          },
        });

        const normalizedData = response.data.stories.map((story) => ({
          ...story,
          category: getCategoryId(story.category),
          ownerId: getOwnerId(story.ownerId),
          ownerUser: getOwnerUser(story.ownerId),
        }));

        console.log('RECEIVED:', normalizedData.length);
        console.log(
          'IDS:',
          normalizedData.map((story) => story._id),
        );
        console.log('HAS MORE:', response.data.hasMore);

        setAllStories((prev) => {
          const nextStories = replace
            ? normalizedData
            : [...prev, ...normalizedData];

          console.log('BEFORE MERGE:', prev.length);
          console.log('AFTER MERGE:', nextStories.length);

          return nextStories;
        });

        setHasMoreStories(response.data.hasMore);
      } catch (err) {
        console.error('Failed to load stories', err);
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory, isReady],
  );

  useEffect(() => {
    prevLengthRef.current = 0;
    setAllStories([]);
    setHasMoreStories(false);

    console.log('INITIAL LOAD START');
    console.log('CATEGORY:', selectedCategory);
    console.log('INITIAL OFFSET:', 0);
    console.log('INITIAL LIMIT:', initialLimit);

    loadStories({
      offset: 0,
      limit: initialLimit,
      replace: true,
    });
  }, [selectedCategory, initialLimit, loadStories]);

  useEffect(() => {
    const wrapper = gridRef.current;
    if (!wrapper) return;

    const grid = wrapper.querySelector('[class*="grid"]');
    if (!grid) return;

    const currentLength = allStories.length;
    const prevLength = prevLengthRef.current;

    if (currentLength <= prevLength) {
      prevLengthRef.current = currentLength;
      return;
    }

    if (prevLength > 0) {
      const newCard = grid.children[prevLength];
      if (newCard instanceof HTMLElement) {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    prevLengthRef.current = currentLength;
  }, [allStories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLoadMore = () => {
    if (loading || !hasMoreStories) return;

    prevLengthRef.current = allStories.length;

    console.log('LOAD MORE CLICK');
    console.log('NEXT OFFSET:', allStories.length);
    console.log('NEXT LIMIT:', nextLimit);

    loadStories({
      offset: allStories.length,
      limit: nextLimit,
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleCategoryChange = (categoryId: string) => {
    console.log('CATEGORY CHANGE:', categoryId);
    setSelectedCategory(categoryId);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectedCategoryName =
    CATEGORIES.find((cat) => cat.id === selectedCategory)?.name ||
    'Всі історії';

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.sectionTitle}>Історії Мандрівників</h1>

        <div className={styles.filterSection}>
          <p className={styles.filterHeading}>Категорії</p>

          <div
            className={`${styles.filterDropdown} ${
              isDropdownOpen ? styles.filterDropdownOpen : ''
            }`}
            ref={dropdownRef}
          >
            <button
              type="button"
              className={`${styles.filterSelectButton} ${
                isDropdownOpen ? styles.filterSelectButtonOpen : ''
              }`}
              onClick={toggleDropdown}
            >
              <span className={styles.filterSelectText}>
                {selectedCategoryName}
              </span>
            </button>

            {isDropdownOpen && (
              <ul className={styles.filterDropdownList}>
                {CATEGORIES.map((category) => (
                  <li key={category.id} className={styles.filterDropdownItem}>
                    <button
                      type="button"
                      className={`${styles.filterDropdownOption} ${
                        selectedCategory === category.id
                          ? styles.filterDropdownOptionActive
                          : ''
                      }`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
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

        {loading && allStories.length === 0 && (
          <p className={styles.loading}>Завантаження...</p>
        )}

        {allStories.length > 0 && (
          <>
            <div ref={gridRef}>
              <TravellersStories
                stories={allStories}
                usersMap={{}}
                categoryMap={CATEGORY_MAP}
              />
            </div>

            {hasMoreStories && (
              <button
                type="button"
                className={styles.loadMoreBtn}
                onClick={handleLoadMore}
                onMouseDown={handleMouseDown}
                disabled={loading}
              >
                {loading ? 'Завантаження...' : 'Показати ще'}
              </button>
            )}
          </>
        )}

        {!loading && allStories.length === 0 && (
          <p className={styles.noResults}>Немає історій в цій категорії</p>
        )}
      </div>
    </section>
  );
}
