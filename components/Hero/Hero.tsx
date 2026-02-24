import css from './Hero.module.css';
import Image from 'next/image';

function Hero() {
  return (
    <section className={css.heroSection}>
      <div className={css.bgWrapper}>
        <Image
          src="/img/hero-bg.jpg"
          alt="Hero Background"
          fill
          priority
          quality={90}
          className={css.bgImage}
        />
        <div className={css.overlay} />
      </div>

      <div className="container">
        <div className={css.heroContent}>
          <h1 className={css.title}>Відкрийте світ подорожей з нами!</h1>
          <p className={css.description}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми історіями та отримувати натхнення для нових пригод. Відкрийте
            для себе нові місця та знайдіть однодумців!
          </p>
          <button className={css.ctaButton}>Доєднатись</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
