'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { pluggyItemsAtom } from '@/utils/jotai/jotai';
import { getItems } from '@/utils/supabase/supabase-client';

import { PluggyItem } from './pluggy-item';

export const PluggyListItems = () => {
  const [items, setItems] = useAtom(pluggyItemsAtom);
  const fetchItems = async () => {
    const supaItems = await getItems();
    // console.log('Fetched items from Supabase:', supaItems);
    setItems(supaItems.map(item => item.item_id));
  };

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-semibold">Saved Items:</h2>
      <button
        onClick={fetchItems}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh Items
      </button>
      {items.map((itemId) => (
        <PluggyItem key={itemId} itemId={itemId} />
      ))}
    </div>
  );
};
