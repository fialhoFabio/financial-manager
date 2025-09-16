'use server';

import 'server-only';
import { getEnv } from 'waku/server';

import { fetchPluggy } from './pluggy-client';

export const fetchPluggyAuth = async () => {
  const clientId = getEnv('PLUGGY_CLIENT_ID');
  const clientSecret = getEnv('PLUGGY_CLIENT_SECRET');

  if (!clientId) throw new Error('PLUGGY_CLIENT_ID is not set in environment variables');
  if (!clientSecret) throw new Error('PLUGGY_CLIENT_SECRET is not set in environment variables');

  const {data, error} = await fetchPluggy('/auth', {
    method: 'post',
    body: { clientId, clientSecret },
  });

  if (data) return data;

  console.error('Error fetching Pluggy auth:', error);
}

export const fetchPluggyConnectToken = async (apiKey: string) =>  {
  const {data, error} = await fetchPluggy('/connect_token', {
    method: 'post',
    headers: {
      'X-API-KEY': apiKey
    }
  });

  if (data) return data;
  
  console.error('Error fetching Pluggy connect token:', error);
};