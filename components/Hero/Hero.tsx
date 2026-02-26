import css from './Hero.module.css';

function Hero() {
  return (
    <section className={css.heroSection}>
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
