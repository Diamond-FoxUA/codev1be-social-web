// 'use client';

// import React, { useState } from 'react';
// import css from './StoryDetails.module.css';
// // import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
// import { useRouter } from 'next/navigation';
// import { addToFavouriteStory } from '@/lib/api/clientApi';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useEffect } from 'react';
// import { getMe } from '@/lib/api/clientApi';
// import { useAuthModalStore } from '@/lib/store/authModalStore';
// type StoryDetailsProps = {
//   storyId: string;
// };

// const StoryDetails = ({ storyId }: StoryDetailsProps) => {
//   const router = useRouter();

//   const [saved, setSaved] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const { open } = useAuthModalStore();

//   useEffect(() => {
//     const checkSaved = async () => {
//       try {
//         const user = await getMe();

//         const isAlreadySaved = user.savedArticles?.includes(storyId) ?? false;

//         setSaved(isAlreadySaved);
//       } catch {
//         setSaved(false);
//       } finally {
//         setIsChecking(false);
//       }
//     };

//     checkSaved();
//   }, [storyId]);

//   const handleSave = async () => {
//     if (saved || isLoading) return;

//     setIsLoading(true);

//     try {
//       await addToFavouriteStory(storyId);

//       setSaved(true);

//       toast.success('Історію збережено');
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         const status = err.response?.status;

//         if (status === 401) {
//           // setIsAuthModalOpen(true);
//           open();
//           return;
//         }

//         if (status === 409) {
//           setSaved(true);
//           return;
//         }
//       }

//       toast.error('Не вдалося зберегти історію');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isChecking) {
//     return (
//       <div className={css.saveContainer}>
//         <button disabled className={css.buttonSaveContainer}>
//           ...
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={css.saveContainer}>
//       <h2 className={css.titleSaveContainer}>Збережіть собі історію</h2>

//       <p className={css.textSaveContainer}>
//         Вона буде доступна у вашому профілі у розділі збережене
//       </p>

//       <button
//         onClick={handleSave}
//         disabled={isLoading || saved}
//         className={`${css.buttonSaveContainer} ${saved ? css.buttonSaved : ''}`}
//       >
//         {isLoading ? 'Збереження...' : saved ? '✓ Збережено' : 'Зберегти'}
//       </button>

//       {isAuthModalOpen && (
//         <ConfirmModal
//           title="Помилка під час збереження"
//           text="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь"
//           confirmButtonText="Увійти"
//           cancelButtonText="Зареєструватись"
//           // onConfirm={() => router.push('/login')}
//           onConfirm={() => {
//             setIsAuthModalOpen(false);
//             router.push('/auth/login'); // ← правильний маршрут
//           }}
//           // onCancel={() => setIsAuthModalOpen(false)}
//           onCancel={() => {
//             setIsAuthModalOpen(false);
//             router.push('/auth/register'); // ← перенаправляє на реєстрацію
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default StoryDetails;

'use client';

import { useState, useEffect } from 'react';
import css from './StoryDetails.module.css';
import { addToFavouriteStory, getMe } from '@/lib/api/clientApi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuthModalStore } from '@/lib/store/authModalStore';

type StoryDetailsProps = {
  storyId: string;
};

const StoryDetails = ({ storyId }: StoryDetailsProps) => {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { open } = useAuthModalStore();

  useEffect(() => {
    const checkSaved = async () => {
      try {
        const user = await getMe();
        setSaved(user.savedArticles?.includes(storyId) ?? false);
      } catch {
        setSaved(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkSaved();
  }, [storyId]);

  const handleSave = async () => {
    if (saved || isLoading) return;

    setIsLoading(true);

    try {
      await addToFavouriteStory(storyId);
      setSaved(true);
      toast.success('Історію збережено');
    } catch (err: unknown) {
      // console.log('error:', err);
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        // console.log('status:', status);
        // console.log('response data:', err.response?.data);

        if (status === 401 || status === 500) {
          open();
          return;
        }

        if (status === 409) {
          setSaved(true);
          return;
        }
      }

      toast.error('Не вдалося зберегти історію');
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className={css.saveContainer}>
        <button disabled className={css.buttonSaveContainer}>
          ...
        </button>
      </div>
    );
  }

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
    </div>
  );
};

export default StoryDetails;
