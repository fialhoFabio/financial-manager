import { getEnv } from 'waku';

import { fetchApiKey } from '@/utils/pluggy.js';

import { PluggyClient } from './pluggy-client.js';

export const PluggyConnector = async () => {
  const apiKey = await fetchApiKey();

  return <PluggyClient apiKey={apiKey} includeSandbox={!!getEnv('PLUGGY_INCLUDE_SANDBOX')} />;
};