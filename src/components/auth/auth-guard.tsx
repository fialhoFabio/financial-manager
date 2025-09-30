'use client';


import type { User } from '@supabase/supabase-js';
import { useAtom } from 'jotai';
// import { useHydrateAtoms } from 'jotai/utils';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'waku';

import { getUserAtom, logoutAtom, sessionAtom, setUserAtom } from '@/utils/jotai/jotai';
import { createClient } from '@/utils/supabase/supabase-client';


export const AuthGuard = ({children, readOnlySSRLoadedActiveUser}: {children: ReactNode, readOnlySSRLoadedActiveUser: User | null}) => {
  const { replace, path } = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  useHydrateAtoms([[setUserAtom, readOnlySSRLoadedActiveUser]]);
  const [user] = useAtom(getUserAtom);
  const [, setSession] = useAtom(sessionAtom);
  const [, logout] = useAtom(logoutAtom);

  useEffect(() => {
    const unsafeRoutes = ['/auth/otp', '/auth', '/'];
    if (!user && !unsafeRoutes.includes(path)) {
      console.warn('No active session, redirecting to home.');
      replace('/');
    }
    if (user && unsafeRoutes.includes(path)) {
      console.warn('User is authenticated, redirecting to /open-finance');
      replace('/open-finance');
    }
    setIsHydrated(true);
  }, [user, replace, path]);

  useEffect(() => {
    const { data: authListener } = createClient().auth.onAuthStateChange((event, session) => {
      // console.info('Auth event: ', event);
      if (event === 'SIGNED_OUT') {
        logout();
        replace('/');
      } else if (event === 'SIGNED_IN') {
        setSession(session);
      } else if (event === 'TOKEN_REFRESHED') {
        setSession(session);
      } else if (event === 'USER_UPDATED') {
        setSession(session);
      } else if (event === 'PASSWORD_RECOVERY') {
        setSession(session);
      } else if (event === 'MFA_CHALLENGE_VERIFIED') {
        setSession(session);
      } else if (event === 'INITIAL_SESSION') {
        setSession(session);
      } else {
        setSession(session);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [logout, replace, setSession]);

  if (!isHydrated) {
    return null; // or a loading spinner, or some placeholder
  }

  return <div>{children}</div>;
};