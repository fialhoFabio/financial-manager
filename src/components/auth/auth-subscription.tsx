'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { logoutAtom, sessionAtom } from '@/utils/jotai';
import { supabaseClient } from '@/utils/supabase-client';

export const AuthSubscription = () => {
  const [, setSession] = useAtom(sessionAtom);
  const [, logout] = useAtom(logoutAtom);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        logout();
      } else if (event === 'SIGNED_IN') {
        console.log('User signed in');
        setSession(session);
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed');
        setSession(session);
      } else if (event === 'USER_UPDATED') {
        console.log('User updated');
        setSession(session);
      } else if (event === 'PASSWORD_RECOVERY') {
        console.log('Password recovery');
        setSession(session);
      } else if (event === 'MFA_CHALLENGE_VERIFIED') {
        console.log('MFA challenge verified');
        setSession(session);
      } else if (event === 'INITIAL_SESSION') {
        console.log('Initial session');
        setSession(session);
      } else {
        console.log('Auth event: ', event);
        setSession(session);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [logout, setSession]);

  return null;
};