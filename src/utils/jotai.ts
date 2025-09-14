import { Session, User } from '@supabase/supabase-js';
import { atom } from 'jotai';

import { logoutSupabase } from './supabase-client';
// import { atomWithImmer } from 'jotai-immer';

export const investmentsAtom = atom<string[]>([]);
export const itemsAtom = atom<string[]>([]);
export const pushItemAtom = atom(null, (get, set, newItem: string) => {
  const currentItems = get(itemsAtom);
  set(itemsAtom, [...currentItems, newItem]);
});

export const sessionAtom = atom<Session | null>(null);
export const getUserAtom = atom<User | null>((get) => get(sessionAtom)?.user || null);
export const logoutAtom = atom(null, (_, set) => {
  set(sessionAtom, null);
  logoutSupabase();
});
