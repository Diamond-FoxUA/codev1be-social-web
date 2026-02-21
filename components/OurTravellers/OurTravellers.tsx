"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TravellersList from "./TravellersList";
import { getTravellers } from "@/lib/travellers-api";
import { Traveller } from "@/types/traveller";
import css from "./OurTravellers.module.css";

export default function OurTravellers() {
  const [travellers, setTravellers] = useState<Traveller[]>([]);

  useEffect(() => {
    async function loadTravellers() {
      const data = await getTravellers({ page: 1, limit: 4 });
      setTravellers(data.items);
    }

    loadTravellers();
  }, []);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h2 className={css.title}>Наші Мандрівники</h2>

        <TravellersList travellers={travellers} />

        <Link href="/travellers" className={css.viewAllBtn}>
          Переглянути всіх
          </Link>
      </div>
    </section>
  );
}