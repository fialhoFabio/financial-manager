import { getActiveUser } from '@/utils/supabase/supabase-SERVER';

import { PluggyConnector } from '../../components/pluggy/pluggy-connector';

export default async function OpenFinancePage() {
  const user = await getActiveUser();
  console.log('User session:', user);

  return (
    <div>
      <PluggyConnector />
      <title>Open Finance</title>
      <h1 className="text-3xl font-bold underline">Open Finance Page</h1>
      <p>Welcome to the Open Finance page!</p>
      {user ? (
        <div>
          <h2 className="text-2xl font-semibold">User Info:</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <p>No active user session found.</p>
      )}
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
