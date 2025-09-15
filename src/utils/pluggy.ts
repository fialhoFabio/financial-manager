import { getEnv } from 'waku/server';

// Utility function to fetch API key (USE ONLY IN SERVER-SIDE CONTEXT)
export const fetchApiKey = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: getEnv('PLUGGY_CLIENT_ID'),
      clientSecret: getEnv('PLUGGY_CLIENT_SECRET')
    }),
  };
  const response = await fetch('https://api.pluggy.ai/auth', options);
  const data = await response.json();
  return data.apiKey;
};

export const fetchConnectToken = async (apiKey: string) => {
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
    },
  };
  const response = await fetch('https://api.pluggy.ai/connect_token', options);
  const data = await response.json();
  if (response.ok) {
    return data.accessToken;
  } else {
    console.error(data.message);
    return null;
  }
};