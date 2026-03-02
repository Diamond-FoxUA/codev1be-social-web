import TravellersStories from "@/components/TravellersStories/TravellersStories";
import MessageNoStories from "@/components/Profile/MessageNoStories/MessageNoStories";

export default function OwnPage() {
  const stories: any[] = []; // сделай [] чтобы увидеть пустое состояние

  if (stories.length === 0) {
    return (
      <MessageNoStories
        text="Ви ще нічого не публікували, поділіться своєю першою історією!"
        buttonText="Опублікувати історію"
        href="/stories/create"
      />
    );
  }

  return (
    <>
      <TravellersStories stories={stories} usersMap={{}} categoryMap={{}} mode="own" />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <button type="button">Показати ще</button>
      </div>
    </>
  );
}