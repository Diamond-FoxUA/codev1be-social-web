import { getStoryById } from '@/lib/api/clientApi';
import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import css from './CreateStory.module.css';

interface Props {
  params: { id: string };
}

const EditStoryPage = async ({ params }: Props) => {
  const { id } = params;

  // Просто получаем данные. Если упадет — сработает глобальный error.js
  const story = await getStoryById(id);

  const initialValues = {
    _id: story._id,
    img: story.img || null,
    title: story.title || '',
    category: story.category || '',
    description: story.description || '',
  };

  return (
    <section>
      <div className="container">
        <h1 className={css.createStoryTitle}>Редагувати історію</h1>
        <AddStoryForm initialValues={initialValues} />
      </div>
    </section>
  );
};

export default EditStoryPage;
