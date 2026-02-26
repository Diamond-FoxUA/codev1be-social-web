'use client';

import css from './AddStoryForm.module.css';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStory } from '@/lib/api/auth';
import StoryFormImage from '../StoryFormImage/StoryFormImage';
import FormSelect from '../FormSelect/FormSelect';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const MAX_TITLE = 80;
const MAX_TEXT = 2500;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const validationSchema = Yup.object({
  img: Yup.mixed<File>()
    .required('Обкладинка статті обовʼязкова')
    .test(
      'fileSize',
      'Максимальний розмір фото 2MB',
      (file) => !!file && file.size <= MAX_FILE_SIZE,
    ),

  title: Yup.string()
    .required('Заголовок обовʼязковий')
    .max(MAX_TITLE, `Максимум ${MAX_TITLE} символів`),

  category: Yup.string().required('Оберіть категорію'),

  description: Yup.string()
    .required('Текст історії обовʼязковий')
    .max(MAX_TEXT, `Максимум ${MAX_TEXT} символів`),
});

const AddStoryForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errorModal, setErrorModal] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createStory,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      router.push(`/stories/${data._id}`);
    },
    onError: () => {
      setErrorModal(true);
    },
  });

  return (
    <div className={css.formWrapper}>
      <Formik
        initialValues={{
          img: null,
          title: '',
          category: '',
          description: '',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ values, setFieldValue, setFieldTouched, errors, touched }) => {
          const allFilled =
            values.img &&
            values.title.trim() !== '' &&
            values.category.trim() !== '' &&
            values.description.trim() !== '';

          return (
            <Form className={css.form}>
              <div className={css.columLeft}>
                <p className={css.formLabel}>Обкладинка статті</p>
                <StoryFormImage
                  initialFile={values.img}
                  onFileSelect={(file) => {
                    setFieldValue('img', file, true);
                    setFieldTouched('img', true, false);
                  }}
                />
                <ErrorMessage name="img" component="p" className="error" />

                <label className={css.formLabel}>Заголовок</label>
                <Field
                  name="title"
                  type="text"
                  className={css.formInput}
                  placeholder="Введіть заголовок історії"
                />
                <ErrorMessage name="title" component="p" className="error" />

                <label className={css.formLabel}>Категорія</label>
                <FormSelect
                  options={[
                    { value: 'Європа', label: 'Європа' },
                    { value: 'Азія', label: 'Азія' },
                    { value: 'Пустелі', label: 'Пустелі' },
                    { value: 'Африка', label: 'Африка' },
                  ]}
                  value={values.category}
                  onChange={(val) => {
                    setFieldValue('category', val);
                    setFieldTouched('category', true);
                  }}
                />
                <ErrorMessage name="category" component="p" className="error" />

                <label className={css.formLabel}>Текст історії</label>
                <Field
                  as="textarea"
                  name="description"
                  className={css.formTextarea}
                  placeholder="Ваша історія тут"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="error"
                />
              </div>

              <div className={css.columRight}>
                <button
                  type="submit"
                  disabled={!allFilled || isPending}
                  className={`${css.formButton} ${css.buttonSave} ${
                    !allFilled || isPending ? css.buttonDisabled : ''
                  }`}
                >
                  {isPending ? 'Збереження...' : 'Зберегти'}
                </button>

                <button
                  type="button"
                  className={`${css.formButton} ${css.buttonCancel}`}
                  onClick={() => router.back()}
                >
                  Відмінити
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      {errorModal && (
        <div className="modalPlaceholder">
          {/* TODO:  ModalComponent */}
          <p>Помилка збереження</p>
        </div>
      )}
    </div>
  );
};

export default AddStoryForm;
