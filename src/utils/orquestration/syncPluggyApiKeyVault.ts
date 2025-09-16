'use server';

import 'server-only';

import { fetchPluggyAuth } from '../pluggy-SERVER';
import { createSecretOnSupabase, updatePluggyApiKey } from '../supabase-SERVER';

export default async function orcSyncPluggyApiKeyVault(uuid?: string | null): Promise<void> {
  const response = await fetchPluggyAuth();
  if (response?.apiKey) {
    if (uuid) {
      await updatePluggyApiKey(uuid, response.apiKey);
    } else {
      await createSecretOnSupabase('pluggy_api_key', response.apiKey);
    }
  }
}
