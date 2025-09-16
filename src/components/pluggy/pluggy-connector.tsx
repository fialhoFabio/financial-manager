import orcProvidePluggyConnectionToken from '@/utils/orquestration/providePluggyConnectionToken.js';

import { PluggyModal } from './pluggy-modal.js';

export const PluggyConnector = async () => {
  const accessToken = await orcProvidePluggyConnectionToken();

  if (!accessToken) {
    return <div>Error obtaining Pluggy connection token.</div>;
  }

  return <PluggyModal connectToken={accessToken} />;
};