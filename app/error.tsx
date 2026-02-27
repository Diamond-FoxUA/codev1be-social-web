'use client';
import css from './error.module.css';
import Button from '@/components/Button/Button';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  console.error(error);

  return (
    <div className={css.container}>
      <div className={css.card}>
        <h1 className={css.title}>Упс, щось пішло не так..</h1>
        <Button className={css.button} onClick={reset} text={"Спробувати знову"} />
      </div>
    </div>
  );
}
