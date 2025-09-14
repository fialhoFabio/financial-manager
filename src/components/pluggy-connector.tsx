import { getEnv } from 'waku';
import { PluggyClient } from './pluggy-client.js';
import { fetchApiKey } from '../utils/pluggy.js';

export const PluggyConnector = async () => {
  const apiKey = await fetchApiKey();

  return <PluggyClient apiKey={apiKey} includeSandbox={!!getEnv('PLUGGY_INCLUDE_SANDBOX')} />;
};