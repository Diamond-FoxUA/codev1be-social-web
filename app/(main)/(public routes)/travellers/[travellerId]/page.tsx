import { notFound } from 'next/navigation';
import TravellerPageClient from '@/components/TravellerPage/TravellerPageClient';
import serverApi from '@/app/api/api';
import css from '@/components/TravellerPage/TravellerPageClient.module.css';
import type { User } from '@/types/user';
import type { Story } from '@/types/story';

type Props = {
  params: Promise<{ travellerId: string }>;
};

export default async function TravellerPage({ params }: Props) {
  const { travellerId } = await params;

  let traveller: User | undefined;
  let stories: Story[] = [];

  try {
    const { data } = await serverApi.get(`/users/${travellerId}`);
    traveller = data.user ?? data;
    stories = data.stories ?? [];
  } catch {
    notFound();
  }

  if (!traveller) notFound();

  return (
    <main>
      <div className="container">
        <div className={`section ${css.section} ${css.sectionPadding}`}>
          <TravellerPageClient traveller={traveller} allStories={stories} />
        </div>
      </div>
    </main>
  );
}
