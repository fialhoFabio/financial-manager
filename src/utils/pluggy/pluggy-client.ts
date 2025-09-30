import { getEnv } from 'waku/server';

import { MethodOf, PluggyRequestBody, TPaths, TPluggyResponse } from '@/types/pluggy-fetch-utils';

import { fetchPluggyAuth } from './pluggy-SERVER';

export async function fetchPluggy<R extends TPaths, M extends MethodOf<R>>(
  route: R,
  options: Omit<RequestInit, 'body'> & {method: M} & PluggyRequestBody<R, M> & { args?: Record<string, string | number | boolean> } & { queryParams?: Record<string, string | number | boolean> }
): Promise<TPluggyResponse<R, M>> {
  // Aqui você pode usar ofetch ou qualquer coisa
  try {
    // Substituir parâmetros na rota, se houver
    if (options.args) {
      Object.entries(options.args).forEach(([key, value]) => {
        route = route.replace(`{${key}}`, encodeURIComponent(String(value))) as R;
      });
    }
    if (options.queryParams) {
      const queryString = new URLSearchParams();
      Object.entries(options.queryParams).forEach(([key, value]) => {
        queryString.append(key, String(value));
      });
      route = (route + `?${queryString.toString()}`) as R;
    }
    const response = await fetch(getEnv('WAKU_PUBLIC_PLUGGY_API_URL') + route, {
      method: options.method?.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : null,
    });
    if (response.ok) {
      return {
        data: await response.json(),
        status: response.status,
      };
    } else {
      return {
        error: await response.json(),
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Unexpected error - fetching from Pluggy:', error);
    throw new Error('Unexpected error - fetching from Pluggy');
  }
}

export async function fetchItem(id: string) {
  const data = await fetchPluggyAuth();
  if (!data) throw new Error('No API key found');
  return await fetchPluggy('/items/{id}', {
     method: 'get',
     headers: { 'X-API-KEY': data.apiKey },
     args: { id }
  });
}
