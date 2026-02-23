import css from "./Join.module.css";
import Link from "next/link";

export default function Join() {
  return (
    <section className="section">
      <div className={`container ${css.container}`}>
        <h2 className={css.sectionHeading}>Приєднуйтесь до нашої спільноти</h2>
        <p className={css.paragraph}>Долучайтеся до мандрівників, які діляться своїми історіями та надихають на нові пригоди.</p>
        <Link className={css.registerBtn} href="/register">Зареєструватися</Link>
      </div>
    </section>
  );
}