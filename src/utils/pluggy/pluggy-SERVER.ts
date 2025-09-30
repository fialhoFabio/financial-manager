'use server';

import 'server-only';
import { getEnv } from 'waku/server';

import orcProvidePluggyApiKey from '../orquestration/providePluggyApiKey';

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

// FETCH CONNECT TOKEN

const fetchPluggyConnectToken = async (apiKey: string) =>  {
  const {data, error} = await fetchPluggy('/connect_token', {
    method: 'post',
    headers: {
      'X-API-KEY': apiKey
    }
  });

  if (data) return data;
  
  console.error('Error fetching Pluggy connect token:', error);
  throw new Error('Error fetching Pluggy connect token');
};

export async function getConnectToken() {
  return await orcProvidePluggyApiKey((apiKey) => fetchPluggyConnectToken(apiKey));
}

// FETCH ITEMS

const fetchPluggyItem = async (apiKey: string, id: string) =>  {
  const {data, error} = await fetchPluggy('/items/{id}', {
    method: 'get',
    headers: {
      'X-API-KEY': apiKey,
    },
    args: { id }
  });

  if (data) return data;

  console.error(`Error fetching Pluggy item: ${id}`, error);
  throw new Error('Error fetching Pluggy item');
};

export async function getItem(id: string) {
  return await orcProvidePluggyApiKey((apiKey) => fetchPluggyItem(apiKey, id));
}

// FETCH ACCOUNTS

const fetchPluggyAccounts = async (apiKey: string, itemId: string) =>  {
  const {data, error} = await fetchPluggy('/accounts', {
    method: 'get',
    headers: {
      'X-API-KEY': apiKey,
    },
    queryParams: { itemId }
  });

  if (data) return data;

  console.error(`Error fetching Pluggy accounts: ${itemId}`, error);
  throw new Error('Error fetching Pluggy accounts');
};

export async function getAccounts(id: string) {
  return await orcProvidePluggyApiKey((apiKey) => fetchPluggyAccounts(apiKey, id));
}


// FETCH ACCOUNTS

const fetchPluggyConsentList = async (apiKey: string, itemId: string) =>  {
  const {data, error} = await fetchPluggy('/consents', {
    method: 'get',
    headers: {
      'X-API-KEY': apiKey,
    },
    queryParams: { itemId }
  });

  if (data) return data;

  console.error(`Error fetching Pluggy accounts: ${itemId}`, error);
  throw new Error('Error fetching Pluggy accounts');
};

export async function getConsentList(itemId: string) {
  return await orcProvidePluggyApiKey((apiKey) => fetchPluggyConsentList(apiKey, itemId));
}
