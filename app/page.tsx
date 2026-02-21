// Сюди будуть йти компоненти для головної сторінки окрім Header та Footer
import OurTravellers from "@/components/OurTravellers/OurTravellers";


export default function Home() {
  return (
    <div>
      <h1>Main Page</h1>
      <OurTravellers />
    </div>
  );
}
