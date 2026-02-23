import Link from "next/link";
import css from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={`container ${css.container}`}>
      <div className={css.messageContainer}>
        <h1 className={css.messageError}>404</h1>
        <h2 className={css.messageTitle}>Сторінку не знайдено</h2>
      </div>
      <p>Вибачте, такої сторінки не існує</p>
      <Link className={css.link} href='/'>Повернутися на головну</Link>
    </div>
  )
}