'use client';


import type { Session } from '@supabase/supabase-js';
import { useAtom } from 'jotai';
// import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'waku';

import { logoutAtom, sessionAtom } from '@/utils/jotai/jotai';
import { supabaseClient } from '@/utils/supabase/supabase-client';



export const AuthGuard = ({children}: {children: ReactNode, initialSession: Session | null}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [session, setSession] = useAtom(sessionAtom);
  const [, logout] = useAtom(logoutAtom);
  const { replace, path } = useRouter();

  useEffect(() => {
    const protectedPaths = ['/open-finance'];
    if (!isHydrated) return;
    if (protectedPaths.includes(path) && !session) {
      console.warn('No active session, redirecting to home.');
      replace('/');
    }
    console.info('Current session: ', session);
  }, [isHydrated, path, replace, session]);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session from supabase: ', session);
      setSession(session);
    });

    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      console.info('Auth event: ', event);
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
        setIsHydrated(true);
      } else {
        setSession(session);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [logout, replace, setSession]);

  return <div>{children}</div>;
};