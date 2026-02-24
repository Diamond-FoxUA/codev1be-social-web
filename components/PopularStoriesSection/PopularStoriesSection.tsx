'use client';

import css from './PopularStoriesSection.module.css';
import Image from 'next/image';
import api from '@/lib/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type IconProps = {
  id: string;
  className?: string;
};

type Resp = {
  stories: Stories;
  totalStories: number;
  page: number;
  perPage: number;
  totalPages: number;
};

type Stories = [
  {
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
  },
];

const SPRITE = '/svg/symbol-defs.svg';

function Icon({ id, className }: IconProps) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`${SPRITE}#${id}`} />
    </svg>
  );
}

const getStories = async () => {
  const { data } = await api.get<Resp>('/api/stories?perPage=4');
  return data;
};

const addToFav = async (id: string) => {
  await api.post(`/api/stories/${id}/save`);
};

export default function PopularStoriesSection() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['Stories'],
    queryFn: getStories,
  });

  const mutation = useMutation({
    mutationFn: addToFav,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Stories'] });
    },
  });

  const handleSave = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading) return <p className={css.msg}>Loading...</p>;
  if (isError) return <p className={css.msg}>Error</p>;

  return (
    <section className={css.storiesSection}>
      <h2 className={css.sectionTitle}>Популярні історії</h2>
      <ul className={css.articleList}>
        {data?.stories.map((story) => (
          <li key={story._id} className={css.articleItem}>
            <article className={css.article}>
              <Image
                src={story.img}
                alt="Story's picture"
                width={335}
                height={223}
                className={css.articlePic}
              />
              <div className={css.articleContent}>
                <p className={css.articleCategory}>{story.category.name}</p>
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
                      {story.date} • {story.favoriteCount}
                      <Icon id="savesmall" className={css.icon} />
                    </p>
                  </div>
                </div>
                <div className={css.buttons}>
                  <a href="" className={css.link}>
                    Переглянути статтю
                  </a>
                  <button
                    className={css.button}
                    onClick={() => handleSave(story._id)}
                  >
                    <Icon id="save" className={css.bigIcon} />
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <a href="" className={css.seeMore}>
        Переглянути всі
      </a>
    </section>
  );
}
