'use client';

import css from './StoryFormImage.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface StoryFormImageProps {
  onFileSelect: (file: File | null) => void;
  initialFile?: File | null;
}

const StoryFormImage = ({ onFileSelect, initialFile }: StoryFormImageProps) => {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!(initialFile instanceof File)) {
      setPreviewUrl('');
      return;
    }

    const url = URL.createObjectURL(initialFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [initialFile]);

  return (
    <>
      <div className={css.imageCover}>
        {previewUrl ? (
          <Image src={previewUrl} alt="Preview" fill priority quality={90} />
        ) : (
          <Image
            src="/img/placeholder-image.jpg"
            alt="Preview"
            fill
            priority
            quality={90}
          />
        )}
      </div>

      <label className={css.labelBtn}>
        Завантажити фото
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;

            if (file && !file.type.startsWith('image/')) {
              alert('Завантажити можна лише зображення');
              onFileSelect(null);
              return;
            }

            setPreviewUrl(file ? URL.createObjectURL(file) : '');
            onFileSelect(file);
          }}
          className={css.hiddenInput}
        />
      </label>
    </>
  );
};

export default StoryFormImage;
