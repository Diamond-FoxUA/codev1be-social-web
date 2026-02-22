import './globals.css';
import css from './page.module.css';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <Hero />
        <About />
      </div>
    </main>
  );
}
