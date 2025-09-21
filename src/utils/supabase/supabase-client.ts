// import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

import { Database } from '@/types/database.types';

export function createClient() {
  return createBrowserClient<Database>(
    import.meta.env.WAKU_PUBLIC_SUPABASE_URL,
    import.meta.env.WAKU_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export const logoutSupabase = async () => {
  const session = await getSessionData();
  if (!session) {
    console.log('No active session found');
    return;
  }
  const { error } = await createClient().auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  } else {
    console.log('User signed out successfully');
  }
};

export const getSessionData = async () => {
  const { data, error } = await createClient().auth.getSession();
  if (error) {
    console.error('Error fetching session:', error.message);
    return null;
  }
  return data.session;
};