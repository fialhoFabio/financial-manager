// 'use server';

import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { getEnv } from 'waku/server';

import { Database } from '@/types/database.types';

// Tudo aqui dentro e um perigo, roda chave de acesso total ao banco de dados
// NUNCA use isso em client-side
// NUNCA compartilhe essa chave, ela da acesso total ao seu banco de dados

// throw error if client
if (typeof window !== 'undefined') {
  throw new Error('This function can only be called on the server');
}

const supabaseUrl = getEnv('WAKU_PUBLIC_SUPABASE_URL');
const supabaseServiceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supa = createClient<Database>(supabaseUrl, supabaseServiceKey);

export async function createSecretOnSupabase(name: string, key: string) {
  return await treatError(async () => {
    const response = await supa.schema('vault').rpc('create_secret', {
      new_name: name,
      new_secret: key,
    });

    if (response.error) {
      console.error('Error creating secret in Supabase:', response.error);
    }

    return response.data;
  });
}

export async function updatePluggyApiKey(uuid: string, apiKey: string) {
  return await treatError(async () => {
    const response = await supa.schema('vault').rpc('update_secret', {
      secret_id: uuid,
      new_secret: apiKey,
    });

    if (response.error) {
      console.error('Error updating secret in Supabase:', response.error);
    }

    return response.data;
  });
}

export async function getSecretOnSupabase(name: string) {
  return await treatError(async () => {
    const response = await supa
      .schema('vault')
      .from('decrypted_secrets')
      .select()
      .eq('name', name)
      .order('created_at', { ascending: false }) // Get the latest inserted key
      .limit(1)
      .single();

    if (response.error) {
      console.error('Error fetching secret from Supabase:', response.error);
    }

    return response.data;
  });
}

async function treatError<T>(cb: () => Promise<T>): Promise<T> {
  try {
    return await cb();
  } catch (error) {
    console.error('Unexpected error - fetching secret from Supabase:', error);
    throw new Error('Unexpected error - fetching secret from Supabase');
  }
}
