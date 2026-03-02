'use client';

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import TravellersStories from "../TravellersStories/TravellersStories";
import { getTravellersStories } from "@/lib/api/travellers-api";
import { User } from "@/types/user";
import { Story, StoryCard, StoryCardUser } from "@/types/story";
import css from "./TravellerPageClient.module.css";

let iziToast: typeof import("izitoast").default | null = null;

interface Props {
  traveller: User;
}

export default function TravellerPageClient({ traveller }: Props) {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(6);

  // Ініціалізація iziToast
  useEffect(() => {
    import("izitoast").then(mod => {
      iziToast = mod.default;
    });
  }, []);

  // Визначаємо perPage по ширині екрану
  const updatePerPage = useCallback(() => {
    const width = window.innerWidth;
    setPerPage(width >= 1440 ? 6 : 4);
  }, []);

  useEffect(() => {
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, [updatePerPage]);

  // Функція завантаження історій
  const fetchStories = useCallback(
    async (nextPage = 1) => {
      setLoading(true);
      try {
        const data = await getTravellersStories({
          travellerId: traveller._id,
          page: nextPage,
          perPage,
        });

        setStories(prev =>
          nextPage === 1 ? data.stories : [...prev, ...data.stories]
        );
        setPage(nextPage);
        setTotalPages(data.totalPages);

        // Повідомлення про останню сторінку
        if (nextPage >= data.totalPages && iziToast) {
          iziToast.show({ message: "Це остання сторінка" });
        }

        // Якщо немає історій
        if (data.stories.length === 0 && nextPage === 1 && iziToast) {
          iziToast.show({ message: "У цього мандрівника немає історій" });
        }
      } catch (err) {
        console.error("Failed to load stories:", err);
        if (iziToast) iziToast.show({ message: "Помилка завантаження історій" });
      } finally {
        setLoading(false);
      }
    },
    [traveller._id, perPage]
  );

  // Перший запит після визначення perPage
  useEffect(() => {
    fetchStories(1);
  }, [fetchStories]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      fetchStories(page + 1);
    }
  };

  // Мапимо Story[] у StoryCard[] для TravellersStories
  const storiesForCard: StoryCard[] = stories.map(story => ({
  ...story,
  category: typeof story.category === "string" ? story.category : story.category.name,
  ownerId: typeof story.ownerId === "string" ? story.ownerId : story.ownerId._id,
}));

  const usersMap: Record<string, StoryCardUser> = { [traveller._id]: traveller };

  return (
        <div className={css.inner}>

          <div className={css.header}>
            <div className={css.avatar}>
              <Image
                src={traveller.avatarUrl ?? "/default-avatar.png"}
                alt={traveller.name}
                width={112}
                height={112}
              />
            </div>

            <div className={css.info}>
              <h2 className={css.name}>{traveller.name}</h2>
              <p className={css.description}>
                {traveller.description}
              </p>
            </div>
          </div>

          <h1 className={css.title}>Історії мандрівника</h1>

          {storiesForCard.length > 0 && (
            <>
              <TravellersStories
                stories={storiesForCard}
                usersMap={usersMap}
                categoryMap={{}}
              />

              {page < totalPages && (
                <button
                  type="button"
                  className={`${css.buttonBase} ${css.viewAllBtn}`}
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? "Завантаження..." : "Показати ще"}
                </button>
              )}
            </>
          )}

        </div>
  );
}