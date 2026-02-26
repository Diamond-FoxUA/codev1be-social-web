import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import css from './CreateStory.module.css';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create a new story',
  description: 'Create a new story',
  openGraph: {
    title: 'Create a new story',
    description: 'Create a new story.',
    url: 'https://codev1be-social-api.onrender.com/stories/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Podorozhnyky',
      },
    ],
  },
};
const page = () => {
  return (
    <section>
      <div className="container">
        <h1 className={css.createStoryTitle}>Створити нову історію</h1>
        <AddStoryForm />
      </div>
    </section>
  );
};

export default page;
