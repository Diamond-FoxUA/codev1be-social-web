import MessageNoStories from "@/components/Profile/MessageNoStories/MessageNoStories";
import TravellersStories from "@/components/TravellersStories/TravellersStories";

export default function SavedPage() {
  const stories: any[] = []; // временно для пустого состояния

  if (stories.length === 0) {
    return (
      <MessageNoStories
        text="У вас ще немає збережених історій, мерщій збережіть вашу першу історію!"
        buttonText="До історій"
        href="/stories"
      />
    );
  }

  return (
    <TravellersStories
      stories={stories}
      usersMap={{}}
      categoryMap={{}}
      mode="default"
    />
  );
}