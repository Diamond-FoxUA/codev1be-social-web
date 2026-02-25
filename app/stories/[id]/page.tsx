// app/stories/[id]/page.tsx
import React from 'react';
import StoryPage from '@/components/StoryPage/StoryPage';
import StoryDetails from '@/components/StoryDetails/StoryDetails';
import { getSingleStory } from '@/lib/api/story';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const story = await getSingleStory(id);
  console.log(story);

  return (
    <div>
      <StoryPage story={story} />
      <StoryDetails />
    </div>
  );
}
