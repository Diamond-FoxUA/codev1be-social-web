import './globals.css';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import Join from '@/components/Join/Join';


export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <OurTravellers />
      <Join />
    </div>
  );
}
