import { User } from "@/types/user";
import TravellerInfo from "./TravellerInfo";

interface Props {
  travellers: User[];
}

export default function TravellersList({ travellers }: Props) {
  return (
    <>
      {travellers.map(traveller => (
        <TravellerInfo key={traveller._id} traveller={traveller} />
      ))}
    </>
  );
}