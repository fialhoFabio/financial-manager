import { useEffect, useState } from 'react';

export const usePluggyConnect = (apiKey: string) => {
  const [connectToken, setConnectToken] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) return;
    console.log('Fetching connect token with apiKey...');
    const getConnectToken = async () => {
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
        setConnectToken(data.accessToken);
      } else {
        console.error(data.message);
      }
    };

    getConnectToken();
    console.log('Pluggy connected!');
  }, [apiKey]);

  return connectToken;
};

export const usePluggyClient = () => {
  const [PluggyConnectComponent, setPluggyConnectComponent] = useState<any>(null);

  useEffect(() => {
    console.log('Loading PluggyConnect component...');
    // Dynamic import to prevent SSR issues
    const loadPluggyConnect = async () => {
      try {
        const { PluggyConnect } = await import('react-pluggy-connect');
        setPluggyConnectComponent(() => PluggyConnect);
      } catch (error) {
        console.error('Failed to load PluggyConnect:', error);
      }
    };

    loadPluggyConnect();
  }, []);

  return PluggyConnectComponent;
};

// Utility function to fetch API key (USE ONLY IN SERVER-SIDE CONTEXT)
export const fetchApiKey = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: process.env.PLUGGY_CLIENT_ID,
      clientSecret: process.env.PLUGGY_CLIENT_SECRET
    }),
  };
  const response = await fetch('https://api.pluggy.ai/auth', options);
  const data = await response.json();
  return data.apiKey;
};