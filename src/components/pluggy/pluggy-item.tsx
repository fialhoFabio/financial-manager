import { useActionState, useEffect, startTransition } from 'react';

import { ExternalLinkIcon } from '@/assets/external-link-icon';
import type { components } from '@/types/pluggy-fetch';
import { getAccounts, getItem } from '@/utils/pluggy/pluggy-SERVER';

export const PluggyItem = ({ itemId }: { itemId: string }) => {
  const [item, actionGetItem, isPending] = useActionState<components['schemas']['Item'] | null>(() => getItem(itemId), null);
  const [accounts, actionGetAccounts, isAccountsPending] = useActionState<components['schemas']['Account'][]>(() => getAccounts(itemId).then(res => res?.results || []), []);

  console.log('Accounts for item', itemId, accounts);

  useEffect(() => {
    startTransition(() => {
      actionGetItem();
      actionGetAccounts();
    });
  }, [actionGetItem, actionGetAccounts]);

  if (!item || isPending) {
    return <div>Loading item {itemId}...</div>;
  }

  const bankColor = '#' + item.connector?.primaryColor || '#000000';

  return (
    <div className="p-4 border rounded shadow mb-4 w-full" style={{ borderColor: bankColor }}>
      <h3 className="text-xl font-bold mb-2 inline-flex items-center gap-2" style={{ color: bankColor }}>
        {item.connector?.name}
        <a href={item.connector?.institutionUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLinkIcon />
        </a>
      </h3>
      {accounts.map(account => renderAccount(account, isAccountsPending))}
    </div>
  );
};

const renderAccount = (account: components['schemas']['Account'], isPending: boolean) => {
  if (isPending) {
    return <p key={account.id}>Loading account {account.id}...</p>;
  }
  if (account.bankData) {
    return (
      <div className='border border-gray-300 p-2 rounded' key={account.id}>
        <div>
          <span>Conta bancária</span>
          <span>{account.name}</span>
        </div>
        <div>
          <span>Saldo</span>
          <span>R$ {account.balance}</span>
        </div>
      </div>
    );
  }
  if (account.creditData) {
    return (
      <div className='border border-gray-300 p-2 rounded flex' key={account.id}>
        <div>
          <span>Cartão de crédito</span>
          <span>{account.name}</span>
        </div>
        <div>
          <span>Saldo</span>
          <span>R$ {account.balance}</span>
        </div>
      </div>
    );
  }
};
