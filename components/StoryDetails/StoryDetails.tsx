// components\StoryDetails\StoryDetails.tsx
import React from 'react';
import css from './StoryDetails.module.css';

const StoryDetails = () => {
  return (
    <div>
      <div className={css.saveContainer}>
        <h2 className={css.titleSaveContainer}>Збережіть собі історію</h2>
        <p className={css.textSaveContainer}>
          Вона буде доступна у вашому профілі у розділі збережене
        </p>
        <button className={css.buttonSaveContainer}>Зберегти</button>
      </div>
    </div>
  );
};

export default StoryDetails;
