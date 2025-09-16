import { Session, User } from '@supabase/supabase-js';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { logoutSupabase } from '@/utils/supabase/supabase-client';
// import { atomWithImmer } from 'jotai-immer';

export const investmentsAtom = atom<string[]>([]);
export const itemsAtom = atom<string[]>([]);
export const pushItemAtom = atom(null, (get, set, newItem: string) => {
  const currentItems = get(itemsAtom);
  set(itemsAtom, [...currentItems, newItem]);
});

// Pluggy Modal State Management

export const isPluggyModalOpenAtom = atom(false);
export const togglePluggyModalAtom = atom(null, (get, set) => {
  const isOpen = get(isPluggyModalOpenAtom);
  set(isPluggyModalOpenAtom, !isOpen);
});
export const pluggyCachedApiKeyAtom = atomWithStorage<string>('UUID-OF-API-KEY', '');

// Supabase Auth State Management

export const sessionAtom = atom<Session | null>(null);
export const getUserAtom = atom<User | null>((get) => get(sessionAtom)?.user || null);
export const logoutAtom = atom(null, (_, set) => {
  set(sessionAtom, null);
  logoutSupabase();
});
