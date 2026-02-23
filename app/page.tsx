// Сюди будуть йти компоненти для головної сторінки окрім Header та Footer

import About from '@/components/About/About';
import OurTravellers from "@/components/OurTravellers/OurTravellers";

export default function Home() {
  return (
    <div>
      <h1>Main Page</h1>
      <About />
      <OurTravellers />
    </div>
  );
}
