import Image from "next/image";
import Link from "next/link";
import { Traveller } from "@/types/traveller";
import css from "./OurTravellers.module.css";

interface Props {
  traveller: Traveller;
}

export default function TravellerInfo({ traveller }: Props) {
  return (
    <div className={css.card}>
      <div className={css.avatar}>
        <Image
          src={traveller.avatarUrl}
          alt={traveller.name}
          width={80}
          height={80}
        />
      </div>

      <h3 className={css.name}>{traveller.name}</h3>

      <p className={css.description}>
        {traveller.description}
      </p>

      <Link
        href={`/travellers/${traveller._id}`}
        className={css.profileButton}
      >
        Переглянути профіль
      </Link>
    </div>
  );
}