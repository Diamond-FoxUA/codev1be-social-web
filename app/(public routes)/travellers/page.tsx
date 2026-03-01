import type { Metadata } from "next";
import TravellersPageClient from "@/components/Travellers/TravellersPageClient";
import css from "@/components/OurTravellers/OurTravellers.module.css"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  title: "Мандрівники | Подорожники",
  description:
    "Переглядай профілі мандрівників, надихайся історіями та знаходь нові маршрути для своїх пригод.",
  keywords: ["мандрівники", "подорожі", "туризм", "travel community"],
  openGraph: {
    title: "Мандрівники | Подорожники",
    description:
      "Переглядай профілі мандрівників та знаходь натхнення для нових подорожей.",
    url: `${baseUrl}/travellers`,
    images: [
      {
        url: `${baseUrl}/preview.png`,
        width: 1200,
        height: 630,
        alt: "Мандрівники - Podorozhnyky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Мандрівники | Подорожники",
    description:
      "Переглядай профілі мандрівників та знаходь натхнення для нових подорожей.",
    images: [`${baseUrl}/preview.png`],
  },
};

export default function TravellersPage() {
  return (
    <main>
      <div className="container">
        <div className={`section ${css.section}`}>
          <h1 className={css.pageTitle}>Мандрівники</h1>
          <TravellersPageClient />
        </div>
      </div>
    </main>
  );
}