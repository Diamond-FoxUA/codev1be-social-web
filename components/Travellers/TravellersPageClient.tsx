"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";
import TravellersList from "@/components/OurTravellers/TravellersList";
import Skeleton from "@/components/Skeleton/Skeleton";
import { getTravellers } from "@/lib/api/travellers-api";
import { User } from "@/types/user";
import css from "@/components/OurTravellers/OurTravellers.module.css";

export default function TravellersPageClient() {
  const [travellers, setTravellers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [initialCards, setInitialCards] = useState<number>(12);
    
  const gridRef = useRef<HTMLDivElement | null>(null);
  const prevLengthRef = useRef(0);

  // Визначення початкової кількості карток по ширині вікна
  useEffect(() => {
    function determineInitialCards() {
      const width = window.innerWidth;
      if (width >= 1440) setInitialCards(12);
      else setInitialCards(8);
    }

    determineInitialCards();
    window.addEventListener("resize", determineInitialCards);
    return () => window.removeEventListener("resize", determineInitialCards);
  }, []);
    
  // початкове завантаження з Promise.all
  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      try {
        const pagesToLoad = Math.ceil(initialCards / 4); // 4 картки на сторінку
        const promises = Array.from({ length: pagesToLoad }, (_, i) =>
          getTravellers({ page: i + 1, perPage: 4 })
        );
        const results = await Promise.all(promises);
        const allUsers = results.flatMap(r => r.users);
        setTravellers(allUsers.slice(0, initialCards));
        setPage(pagesToLoad);
        setTotalPages(results[0].totalPages);
      } catch (err) {
        console.error("Failed to load travellers", err);
      } finally {
        setLoading(false);
      }
    }

    loadInitial();
  }, [initialCards]);
    
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prevLength = prevLengthRef.current;
    const currentLength = travellers.length;

    if (currentLength <= prevLength) return;

    const newCard = grid.children[prevLength];

    if (newCard instanceof HTMLElement) {
      newCard.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [travellers]);

  const handleLoadMore = async () => {
    if (page >= totalPages) return;
    prevLengthRef.current = travellers.length;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await getTravellers({ page: nextPage, perPage: 4 });
      setTravellers(prev => [...prev, ...data.users]);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to load more travellers", err);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = page < totalPages;

  return (
    <div className={css.inner}>

      <div className={css.grid} ref={gridRef}>
        {loading && travellers.length === 0
          ? Array.from({ length: initialCards }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : <TravellersList travellers={travellers} />
        }
      </div>

      {hasMore && (
        <button
          type="button"
          className={css.viewAllBtn}
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Завантаження..." : "Показати ще"}
        </button>
      )}
                  
    </div>
  );
}