'use client';

import { createClient } from '@supabase/supabase-js';

import { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.WAKU_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.WAKU_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const logoutSupabase = async () => {
  const session = await getSessionData();
  if (!session) {
    console.log('No active session found');
    return;
  }
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  } else {
    console.log('User signed out successfully');
  }
};

export const getSessionData = async () => {
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    console.error('Error fetching session:', error.message);
    return null;
  }
  return data.session;
};