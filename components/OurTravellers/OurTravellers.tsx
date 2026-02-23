"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TravellersList from "./TravellersList";
import Skeleton from "../Skeleton/Skeleton";
import { getTravellers } from "@/lib/travellers-api";
import { User } from "@/types/user";
import css from "./OurTravellers.module.css";

export default function OurTravellers() {
  const [travellers, setTravellers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTravellers() {
      try {
        const data = await getTravellers({ page: 1, perPage: 4 });
        console.log("Data from API:", data); 
        setTravellers(data.users);
      } catch (error) {
        console.error("Failed to load travellers", error);
      } finally {
        setLoading(false);
      }
    }

    loadTravellers();
  }, []);

  return (
    <div className="container">
      <section className={css.section}>
        <div className={css.inner}>
          <h2 className={css.title}>Наші Мандрівники</h2>

          {loading ? (
            <div className={css.grid}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} />
              ))}
            </div>
          ) : (
            <TravellersList travellers={travellers} />
          )}

          <Link href="/travellers" className={css.viewAllBtn}>
            Переглянути всіх
          </Link>
        </div>
      </section>
    </div>
  );
}