'use client';
import React, { useState } from 'react';
import axios from 'axios';
import css from './StoryDetails.module.css';

type StoryDetailsProps = {
  storyId: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const StoryDetails = ({ storyId }: StoryDetailsProps) => {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setError('Будь ласка, увійдіть в систему');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await axios.post(
        `${BASE_URL}/api/stories/${storyId}/save`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      setSaved(true);
    } catch (err: any) {
      console.error('Save error details:', err.response?.data || err.message);

      const status = err.response?.status;
      if (status === 401) {
        setError('Ваша сесія закінчилася. Перезайдіть в акаунт.');
      } else if (status === 404) {
        setError('Помилка адреси (404). Перевірте консоль.');
      } else {
        setError(err.response?.data?.message || 'Не вдалося зберегти історію');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.saveContainer}>
      <h2 className={css.titleSaveContainer}>Збережіть собі історію</h2>
      <p className={css.textSaveContainer}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>

      <button
        onClick={handleSave}
        disabled={isLoading || saved}
        className={css.buttonSaveContainer}
      >
        {isLoading ? 'Збереження...' : saved ? 'Збережено' : 'Зберегти'}
      </button>

      {error && (
        <p
          className={css.errorMessage}
          style={{ color: 'red', marginTop: '10px' }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default StoryDetails;
