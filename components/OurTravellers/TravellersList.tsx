import { Traveller } from "@/types/traveller";
import TravellerInfo from "./TravellerInfo";
import css from "./OurTravellers.module.css";

interface Props {
  travellers: Traveller[];
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