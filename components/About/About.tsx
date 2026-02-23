import css from './About.module.css';

type IconProps = {
  id: string;
  className?: string;
};

const SPRITE = '/svg/icons.svg';

function Icon({ id, className }: IconProps) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`${SPRITE}#${id}`} />
    </svg>
  );
}

export default function About() {
  return (
    <section className={`section ${css.about}`}>
      <div className="container">
        {/* Hero текст */}
        <div className={css.intro}>
          <h2 className={css.title}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={css.description}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділилися. Наша платформа створена, щоб обʼєднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>
        {/* Три колонки */}
        <div className={css.features}>
          <div className={css.feature}>
            <Icon id="magic" className={css.icon} />
            <h3 className={css.featureTitle}>Наша місія</h3>
            <p className={css.featureText}>
              Обʼєднувати людей через любов до пригод та надихати на нові
              відкриття.
            </p>
          </div>
          <div className={css.feature}>
            <Icon id="bag" className={css.icon} />
            <h3 className={css.featureTitle}>Автентичні історії</h3>
            <p className={css.featureText}>
              Ми цінуємо справжні, нередаговані враження від мандрівників з
              усього світу.
            </p>
          </div>
          <div className={css.feature}>
            <Icon id="people" className={css.icon} />
            <h3 className={css.featureTitle}>Ваша спільнота</h3>
            <p className={css.featureText}>
              Станьте частиною спільноти, де кожен може бути і автором, і
              читачем.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
