import { PluggyConnector } from '@/components/pluggy/pluggy-connector';
import { PluggyListItems } from '@/components/pluggy/pluggy-list-items';

export default async function OpenFinancePage() {
  return (
    <div className='w-full max-w-4xl px-4'>
      <PluggyConnector />
      <title>Open Finance</title>
      <h1 className="text-3xl font-bold underline">Open Finance Page</h1>
      <p>Welcome to the Open Finance page!</p>
      <PluggyListItems />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
