// app\stories\[id]\page.tsx
import React from 'react';
import css from '../../../components/StoryPage/StoryPage.module.css';
import Image from 'next/image';
import { getSingleStory } from '@/lib/api/story';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: Props) {
  const { id } = await params;
  const story = await getSingleStory(id);
  console.log(story);

  return (
    <div className={css.wrapper}>
      <article className={css.article}>
        <header className={css.header}>
          <h1 className={css.title}>{story.title}</h1>
          <div className={css.headerGroup}>
            <p className={css.text}>
              <strong className={css.accent}>Автор статті: </strong>
              {story.ownerId.name}
            </p>
            <p className={css.text}>
              <strong className={css.accent}>Опубліковано </strong> {story.date}
            </p>
            <span className={css.category}>
              {story.category.name || 'Без категорії'}
            </span>
          </div>
        </header>
        <Image
          src={story.img || '/img/placeholder.png'}
          alt={story.title}
          width={800}
          height={500}
          className={css.image}
        />
        <div className={css.textArticleGroup}>
          <p className={css.textArticle}>{story.article}</p>
          <div className={css.saveContainer}>
            <h2 className={css.titleSaveContainer}>Збережіть собі історію</h2>
            <p className={css.textSaveContainer}>
              Вона буде доступна у вашому профілі у розділі збережене
            </p>
            <button className={css.buttonSaveContainer}>Зберегти</button>
          </div>
        </div>
      </article>
    </div>
  );
}
