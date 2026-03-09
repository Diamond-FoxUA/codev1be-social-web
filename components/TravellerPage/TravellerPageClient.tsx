'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TravellersStories from '../TravellersStories/TravellersStories';
import type { User } from '@/types/user';
import type { Story, StoryCard, StoryCardUser } from '@/types/story';
import css from './TravellerPageClient.module.css';

type Props = {
  traveller: User;
  allStories: Story[];
};

const getPerPage = () =>
  typeof window !== 'undefined' && window.innerWidth >= 1440 ? 6 : 4;

export default function TravellerPageClient({ traveller, allStories }: Props) {
  const [perPage, setPerPage] = useState(6);
  const [visibleCount, setVisibleCount] = useState(perPage);
  const prevLengthRef = useRef(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setPerPage(getPerPage());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    setVisibleCount(perPage);
  }, [perPage]);

  const handleLoadMore = () => {
    prevLengthRef.current = visibleCount;
    setVisibleCount((prev) => prev + perPage);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const storiesForCard: StoryCard[] = allStories
    .slice(0, visibleCount)
    .map((story) => ({
      ...story,
      category:
        typeof story.category === 'string'
          ? story.category
          : (story.category?._id ?? ''),
      ownerId:
        typeof story.ownerId === 'string'
          ? story.ownerId
          : (story.ownerId?._id ?? ''),
      ownerUser: typeof story.ownerId === 'string' ? undefined : story.ownerId,
    }));

  const usersMap: Record<string, StoryCardUser> = {
    [traveller._id]: {
      _id: traveller._id,
      name: traveller.name,
      avatarUrl:
        traveller.avatarUrl ??
        'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
  };

  const hasMore = visibleCount < allStories.length;

  useEffect(() => {
    if (prevLengthRef.current === 0) return;

    const wrapper = gridRef.current;
    if (!wrapper) return;

    const grid = wrapper.querySelector('[class*="grid"]');
    if (!grid) return;

    const newCard = grid.children[prevLengthRef.current];

    if (newCard instanceof HTMLElement) {
      newCard.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [visibleCount]);

  return (
    <div className={css.inner}>
      <div className={css.header}>
        <div className={css.avatar}>
          <Image
            src={
              traveller.avatarUrl ??
              'https://ac.goit.global/fullstack/react/default-avatar.jpg'
            }
            alt={traveller.name}
            width={199}
            height={199}
          />
        </div>
        <div className={css.info}>
          <h2 className={css.name}>{traveller.name}</h2>
          <p className={css.description}>{traveller.description}</p>
        </div>
      </div>

      <h1 className={css.title}>Історії мандрівника</h1>

      {allStories.length === 0 ? (
        <div className={css.noStories}>
          <p>Цей користувач ще не публікував історій</p>
          <Link
            href="/travellers"
            className={`${css.buttonBase} ${css.backBtn}`}
          >
            Назад до історій
          </Link>
        </div>
      ) : (
        <div ref={gridRef}>
          <TravellersStories
            stories={storiesForCard}
            usersMap={usersMap}
            categoryMap={{}}
          />

          {hasMore && (
            <button
              type="button"
              className={`${css.buttonBase} ${css.viewAllBtn}`}
              onClick={handleLoadMore}
              onMouseDown={handleMouseDown}
            >
              Показати ще
            </button>
          )}
        </div>
      )}
    </div>
  );
}