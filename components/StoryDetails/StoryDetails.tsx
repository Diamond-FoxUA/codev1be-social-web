'use client';

import React, { useState } from 'react';
import axios from 'axios';
import css from './StoryDetails.module.css';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { useRouter } from 'next/navigation';

type StoryDetailsProps = {
  storyId: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const StoryDetails = ({ storyId }: StoryDetailsProps) => {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(
        `${BASE_URL}/api/stories/${storyId}/save`,
        {},
        {
          withCredentials: true,
        },
      );

      setSaved(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const message = err.response?.data?.message;

        if (status === 401) {
          setIsAuthModalOpen(true);
        } else if (message === '✓ Збережено' || status === 409) {
          setSaved(true);
        } else {
          setError(message || 'Помилка збереження');
        }
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
        className={`${css.buttonSaveContainer} ${saved ? css.buttonSaved : ''}`}
      >
        {isLoading ? 'Збереження...' : saved ? '✓ Збережено' : 'Зберегти'}
      </button>

      {error && !isAuthModalOpen && (
        <p
          className={css.errorMessage}
          style={{ color: 'red', marginTop: '10px' }}
        >
          {error}
        </p>
      )}

      {/* Модальное окно ошибки авторизации */}
      {isAuthModalOpen && (
        <ConfirmModal
          title="Потрібна авторизація"
          text="Щоб зберегти цю історию, вам необхідно увійти у свій аккаунт."
          confirmButtonText="Увійти"
          cancelButtonText="Скасувати"
          onConfirm={() => router.push('/login')}
          onCancel={() => setIsAuthModalOpen(false)}
        />
      )}
    </div>
  );
};

export default StoryDetails;
