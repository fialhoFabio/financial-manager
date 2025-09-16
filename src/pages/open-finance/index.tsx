import { PluggyButtonModal } from '@/components/pluggy/pluggy-button-modal';
import { PluggyConnector } from '@/components/pluggy/pluggy-connector';

export default async function OpenFinancePage() {
  return (
    <div>
      <PluggyConnector />
      <PluggyButtonModal />
      <title>Open Finance</title>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
