import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Мій профіль',
}

export default function ProfilePage() {
  redirect('/profile/saved');
}