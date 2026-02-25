import React from 'react';
import css from '../../../components/StoryPage/StoryPage.module.css';
import Image from 'next/image';

const page = () => {
  return (
    <div className={css.wrapper}>
      <article className={css.article}>
        <header className={css.header}>
          <h1 className={css.title}>Заголовок статті буде тут</h1>
          <div className={css.headerGroup}>
            <p className={css.text}>
              <strong className={css.accent}>Автор:</strong> Ім'я автора
            </p>
            <p className={css.text}>
              <strong className={css.accent}>Опубліковано</strong> 23.07.2025
            </p>
            <span className={css.category}>Категорія</span>
          </div>
        </header>
        {/* <img src="/path.jpg" alt="Description" className={css.image} /> */}
        <Image src="" alt="Description" className={css.image} />
        <div className={css.textArticleGroup}>
          <p className={css.textArticle}>
            Венеція — це не лише площа Святого Марка і гондоли на Канале Ґранде.
            Ми вирішили дослідити місто з іншого боку — вулицями, де не ходять
            натовпи, де старі венеціанці щодня п’ють еспресо на розі, а сусідки
            обговорюють погоду через балкони. Виявляється, є цілий район —
            Кастелло, де майже немає туристів, але є мальовничі канали,
            старовинні церкви і рибні ринки. Відкрили для себе і острів Джудекка
            — справжню Венецію без пафосу. У блозі ділюсь маршрутами, куди варто
            заглянути, аби побачити справжнє місто.
          </p>
          <div className={css.saveContainer}>
            <h2 className={css.titleSaveContainer}>Збережіть собі історію</h2>
            <p className={css.textSaveContainer}>
              Вона буде доступна у вашому профілі у розділі збережене
            </p>
            <button className={css.buttonSaveContainer}>Зберегти</button>
          </div>
        </div>
      </article>

      <div>
        Популярні історії---------------СЛЕДУЮЩИЙ БЛОК---------------------
      </div>
    </div>
  );
};

export default page;
