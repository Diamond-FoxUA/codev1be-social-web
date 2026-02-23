'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { api } from '@/lib/api/auth';

const LoginSchema = Yup.object({
  email: Yup.string().email('Невірний email').required("Обов'язково"),
  password: Yup.string().required("Обов'язково"),
});

type LoginValues = {
  email: string;
  password: string;
};

type ApiErrorData = {
  message?: string;
};

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <div className={styles.logoRow}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/svg/logo.svg"
              alt="Подорожники"
              width={18}
              height={18}
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>Подорожники</span>
          </Link>
        </div>

        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.tabs}>
              <Link href="/register" className={styles.tab}>
                Реєстрація
              </Link>
              <Link
                href="/login"
                className={`${styles.tab} ${styles.tabActive}`}
              >
                Вхід
              </Link>
            </div>

            <h1 className={styles.title}>Вхід</h1>
            <p className={styles.subtitle}>Раді бачити вас знову!</p>

            <Formik<LoginValues>
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={async (values, helpers) => {
                helpers.setStatus(null);

                try {
                  // ✅ ВАЖНО: идём через Next proxy
                  await api.post('/api/auth/login', values);

                  router.push('/');
                  router.refresh();
                } catch (err: unknown) {
                  let msg = 'Invalid credentials';

                  if (axios.isAxiosError(err)) {
                    const data = err.response?.data as ApiErrorData | undefined;
                    msg = data?.message ?? err.message ?? msg;
                  }

                  helpers.setStatus(msg);
                } finally {
                  helpers.setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                status,
              }) => (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <label className={styles.field}>
                    <span className={styles.label}>Пошта*</span>
                    <input
                      className={styles.input}
                      name="email"
                      type="email"
                      placeholder="hello@podorozhnyky.ua"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                    />
                    {touched.email && errors.email && (
                      <span style={{ color: 'crimson', fontSize: 12 }}>
                        {errors.email}
                      </span>
                    )}
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Пароль*</span>
                    <input
                      className={styles.input}
                      name="password"
                      type="password"
                      placeholder="********"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                    />
                    {touched.password && errors.password && (
                      <span style={{ color: 'crimson', fontSize: 12 }}>
                        {errors.password}
                      </span>
                    )}
                  </label>

                  {status && (
                    <div style={{ color: 'crimson', fontSize: 12 }}>
                      {status}
                    </div>
                  )}

                  <button
                    className={styles.button}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '...' : 'Увійти'}
                  </button>
                </form>
              )}
            </Formik>

            <div className={styles.footer}>© 2025 Подорожники</div>
          </div>
        </div>
      </div>
    </div>
  );
}
