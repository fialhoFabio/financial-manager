'use client';

import { useState } from 'react';

import { usePluggyClient, usePluggyConnect } from '@/utils/pluggy';

interface PluggyClientProps {
  apiKey: string;
  includeSandbox: boolean;
}

export const PluggyClient = ({ apiKey, includeSandbox }: PluggyClientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const PluggyConnectComponent = usePluggyClient();
  const connectToken = usePluggyConnect(apiKey);

  const onSuccess = (data: any) => {
    setIsOpen(false);
    console.log('Pluggy Connect Success:', data);
  };

  if (!isOpen) return (
    <button 
      className="rounded-xs bg-black px-2 py-0.5 text-sm text-white"
      onClick={() => setIsOpen(true)}
    >
        Connect with Pluggy
    </button>
  );
  if (!connectToken || !PluggyConnectComponent) {
    return <div>Loading Pluggy Connect...</div>;
  }
  console.log('Opening Pluggy Connect');
  return (
    <PluggyConnectComponent
      connectToken={connectToken}
      includeSandbox={includeSandbox}
      onClose={() => setIsOpen(false)}
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

const onError = (error: any) => {
  console.log('Pluggy Connect Error:', error);
};
