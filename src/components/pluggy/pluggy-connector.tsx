import { fetchApiKey, fetchConnectToken } from '@/utils/pluggy.js';

import { PluggyModal } from './pluggy-modal.js';

export const PluggyConnector = async () => {
  const apiKey = await fetchApiKey();
  const connectToken = await fetchConnectToken(apiKey);

  return <PluggyModal connectToken={connectToken} />;
};