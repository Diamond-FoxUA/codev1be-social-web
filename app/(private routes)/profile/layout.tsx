import type { ReactNode } from "react";
import PageToggle from "@/components/PageToggle/PageToggle";
import TravellerInfo from "@/components/OurTravellers/TravellerInfo";

import styles from "./ProfileLayout.module.css";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  // временная заглушка traveller (потом заменим на реальные данные)
  const traveller = {
    _id: "me",
    name: "Назар Ткаченко",
    avatarUrl: "/public/svg/avatar.svg",
    description:
      "Прихильник культурного туризму. Пишу про історичні локації, архітектуру та цікаві місцеві традиції.",
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        

        {/* верхний блок профиля */}
        <div className={styles.headerBlock}>
  <TravellerInfo traveller={traveller as any} variant="profile" />
</div>

        {/* tabs */}
        <div className={styles.tabs}>
          <PageToggle />
        </div>

        {/* контент вкладки */}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}