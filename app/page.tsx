import './globals.css';
import css from './page.module.css';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Join from '@/components/Join/Join';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Join />
    </div>
  );
}
