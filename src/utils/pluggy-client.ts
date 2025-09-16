import { getEnv } from 'waku/server';

import { MethodOf, PluggyRequestBody, TPaths, TPluggyResponse } from '@/types/pluggy-fetch-utils';

export async function fetchPluggy<R extends TPaths, M extends MethodOf<R>>(
  route: R,
  options: Omit<RequestInit, 'body'> & {method: M} & PluggyRequestBody<R, M>
): Promise<TPluggyResponse<R, M>> {
  // Aqui você pode usar ofetch ou qualquer coisa
  try {
    const response = await fetch(getEnv('PLUGGY_API_URL') + route, {
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
