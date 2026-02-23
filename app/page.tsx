// Сюди будуть йти компоненти для головної сторінки окрім Header та Footer
import About from '@/components/About/About';
import Join from '@/components/Join/Join';

export default function Home() {
  return (
    <div>
      <About />
      <Join />
    </div>
  );
}
