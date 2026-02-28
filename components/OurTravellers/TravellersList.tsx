import { User } from "@/types/user";
import TravellerInfo from "./TravellerInfo";
import css from "./OurTravellers.module.css";

interface Props {
  travellers: User[];
}

export default function TravellersList({ travellers }: Props) {
  return (
    <div className={css.grid}>
      {travellers.map(traveller => (
        <TravellerInfo key={traveller._id} traveller={traveller} />
      ))}
    </div>
  );
}