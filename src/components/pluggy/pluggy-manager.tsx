'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { pluggyCachedApiKeyAtom } from '@/utils/jotai';

export const PluggyManager = ({uuid}: {uuid: string}) => {
  const [uuidPluggyApiKey, setUUIDPluggyApiKey] = useAtom(pluggyCachedApiKeyAtom);

  useEffect(() => {
    if (uuid && uuid !== uuidPluggyApiKey) {
      setUUIDPluggyApiKey(uuid);
    }
  }, [uuid, uuidPluggyApiKey, setUUIDPluggyApiKey]);

  return <div>Pluggy Manager: {uuidPluggyApiKey}</div>;
};