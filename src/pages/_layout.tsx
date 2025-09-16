import type { ReactNode } from 'react';

import { AuthGuard } from '@/components/auth/auth-guard';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import '../styles.css';
import { supabaseClient } from '../utils/supabase/supabase-client';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();
  const session = await supabaseClient.auth.getSession().then(({ data }) => data.session);
  console.log('Session data in layout: ', session);

  return (
    <div className="font-['Nunito']">
      <AuthGuard initialSession={session}>
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
    render: 'static',
  } as const;
};
