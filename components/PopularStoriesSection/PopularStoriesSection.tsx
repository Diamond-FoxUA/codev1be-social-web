'use client';

import css from './PopularStoriesSection.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { nextServer } from '@/lib/api/server';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Skeleton from '../Skeleton/Skeleton';

import { useAuth } from '@/hooks/useAuth';
import { useAuthModalStore } from '@/lib/store/authModalStore';

import toast from 'react-hot-toast';

type IconProps = {
  id: string;
  className?: string;
};

type Story = {
  _id: string;

  img: string;

  title: string;

  article: string;

  category: {
    _id: string;
    name: string;
  };

  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };

  date: string;

  favoriteCount: number;
};

type Resp = {
  stories: Story[];

  totalStories: number;

  page: number;

  perPage: number;

  totalPages: number;
};

const SPRITE = '/svg/icons.svg';

function Icon({ id, className }: IconProps) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`${SPRITE}#${id}`} />
    </svg>
  );
}

/// API

const getStories = async (): Promise<Resp> => {
  const { data } = await nextServer.get('/api/stories?perPage=4');

  return data;
};

const addToFav = async (id: string) => {
  const { data } = await nextServer.post(`/api/stories/${id}/save`);

  return data;
};

export default function PopularStoriesSection() {
  /// auth

  const { isAuthenticated } = useAuth();

  const { open } = useAuthModalStore();

  /// react query

  const queryClient = useQueryClient();

  const {
    data,

    isLoading,

    isError,
  } = useQuery({
    queryKey: ['Stories'],

    queryFn: getStories,
  });

  /// mutation

  const mutation = useMutation({
    mutationFn: addToFav,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Stories'],
      });
    },

    onError: () => {
      toast.error('Помилка при збереженні');
    },
  });

  /// click handler

  const handleSave = (id: string) => {
    /// якщо НЕ авторизований

    if (!isAuthenticated) {
      open();

      return;
    }

    mutation.mutate(id);
  };

  /// error

  if (isError) return <p className={css.msg}>Error</p>;

  /// render

  return (
    <section className="section">
      <div className="container">
        <h2 className={css.sectionTitle}>Популярні історії</h2>

        {isLoading ? (
          <div className={css.loader}>
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <Skeleton key={index} height={397} />
            ))}
          </div>
        ) : (
          <ul className={css.articleList}>
            {data?.stories.map((story) => {
              /// loader тільки на цій кнопці

              const isSaving =
                mutation.isPending && mutation.variables === story._id;

              return (
                <li key={story._id} className={css.articleItem}>
                  <article className={css.article}>
                    <Image
                      src={story.img}
                      alt={story.title}
                      width={335}
                      height={223}
                      className={css.articlePic}
                    />

                    <div className={css.articleContent}>
                      <p className={css.articleCategory}>
                        {story.category.name}
                      </p>

                      <h3 className={css.articleTitle}>{story.title}</h3>

                      <p className={css.articleTxt}>{story.article}</p>

                      <div className={css.articleMeta}>
                        <Image
                          src={story.ownerId.avatarUrl}
                          alt="avatar"
                          width={48}
                          height={48}
                          className={css.avatar}
                        />

                        <div className={css.info}>
                          <p className={css.name}>{story.ownerId.name}</p>

                          <p className={css.data}>
                            {story.date}

                            {' • '}

                            {story.favoriteCount}

                            <Icon id="savesmall" className={css.icon} />
                          </p>
                        </div>
                      </div>

                      <div className={css.buttons}>
                        <Link
                          href={`/stories/${story._id}`}
                          className={css.link}
                        >
                          Переглянути статтю
                        </Link>

                        <button
                          className={css.button}
                          onClick={() => handleSave(story._id)}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            '...'
                          ) : (
                            <Icon id="save" className={css.bigIcon} />
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                </li>
              );
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
