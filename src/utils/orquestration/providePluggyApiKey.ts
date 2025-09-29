'use server';

import 'server-only';
import { getSecretOnSupabase } from '../supabase/vault-SERVER';

import orcSyncPluggyApiKeyVault from './syncPluggyApiKeyVault';

export default async function orcProvidePluggyApiKey<R>(cb: (apiKey: string) => R, isRetry = false): Promise<R> {
    // Get the stored API key from Supabase
    const apiKeyData = await getSecretOnSupabase('pluggy_api_key');

    // Try to use existing valid API key
    if (apiKeyData?.decrypted_secret && apiKeyData?.updated_at) {
      const { decrypted_secret: apiKey, updated_at: lastUpdated } = apiKeyData;
      
      if (isApiKeyValid(apiKey, lastUpdated)) {
        const response = await cb(apiKey);
        if (response) return response;
        console.warn('Failed to run callback with existing API key');
      }
    }

    // If we've already tried to refresh the key, throw an error
    if (isRetry) {
      throw new Error('Unable to obtain valid Pluggy connection token after API key refresh');
    }

    // Refresh the API key and try again
    console.info('Refreshing Pluggy API key...');
    await orcSyncPluggyApiKeyVault(apiKeyData?.id);
    return await orcProvidePluggyApiKey(cb, true);
}

const isApiKeyValid = (key: string | null, updated_at: string | null): boolean => {
  if (!key || !updated_at) return false;
  
  // Check if the API key is still valid (assuming it's valid for 2 hours)
  const now = new Date();
  const expirationTime = new Date(updated_at);
  expirationTime.setHours(expirationTime.getHours() + 2); // API key is valid for 2 hours
  
  return now < expirationTime;
};