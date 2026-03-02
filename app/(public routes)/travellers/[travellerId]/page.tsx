import TravellerPageClient from "@/components/TravellerPage/TravellerPageClient";
import { getTravellerById } from "@/lib/api/travellers-api";
import css from "@/components/TravellerPage/TravellerPageClient.module.css"

type Props = { params: { travellerId: string } };

export default async function TravellerPage({ params }: Props) {
  const traveller = await getTravellerById(params.travellerId);

  return (
    <main>
      <div className="container">
        <div className={`section ${css.section} ${css.sectionPadding}`}>
          <TravellerPageClient traveller={traveller} />
        </div>
      </div>
    </main>
  );
}

