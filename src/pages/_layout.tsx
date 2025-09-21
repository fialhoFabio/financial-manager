import type { ReactNode } from 'react';

import { AuthGuard } from '@/components/auth/auth-guard';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import '../styles.css';
import { getActiveUser } from '../utils/supabase/supabase-SERVER';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();
  const { user } = await getActiveUser();

  console.log('Layout user:', user); // Adjusted to log the cookie header

  return (
    <div className="font-['Nunito']">
      <AuthGuard readOnlySSRLoadedActiveUser={user}>
        <meta name="description" content={data.description} />
        <link rel="icon" type="image/png" href={data.icon} />
        <Header />
        <main className="min-h-screen flex justify-center py-50">
          {children}
        </main>
        <Footer />
      </AuthGuard>
    </div>
  );
}

const getData = async () => {
  const data = {
    description: 'An internet website!',
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'dynamic', // Isso deixa tudo dynamic, mas quebra o uso de cookies no layout, ele vao mudar o jeito que middlewares funcionam
  } as const;
};
