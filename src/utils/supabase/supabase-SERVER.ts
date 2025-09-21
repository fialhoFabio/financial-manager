'use server';

import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { getEnv } from 'waku/server';

import { getCookies } from './../cookie';

// import { Database } from '@/types/database.types';

export async function createClient() {
  const supabaseUrl = getEnv('WAKU_PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = getEnv('WAKU_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll: () => getCookies()
      },
    }
  )
}

export async function getActiveUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data;
}

export async function getActiveSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data;
}