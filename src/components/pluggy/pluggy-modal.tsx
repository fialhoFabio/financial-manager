'use client';

import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { PluggyConnectProps } from 'react-pluggy-connect';

import { isPluggyModalOpenAtom } from '@/utils/jotai';

export const PluggyModal = ({ connectToken }: { connectToken: string }) => {
  // Importando dinamicamente o componente para evitar problemas com SSR (window undefined)
  const PluggyConnectComponent = useDynamicImport<React.FC<PluggyConnectProps>>(() => import('react-pluggy-connect').then(mod => mod.PluggyConnect));
  const [isPluggyModalOpen, setIsPluggyModalOpen] = useAtom(isPluggyModalOpenAtom);

  if (!isPluggyModalOpen || !PluggyConnectComponent) return null;

  const handleClose = () => {
    setIsPluggyModalOpen(false);
  };

  const handleSuccess = () => {
    setIsPluggyModalOpen(false);
  };

  return (
    <PluggyConnectComponent
      connectToken={connectToken}
      includeSandbox={true}
      onClose={handleClose}
      onSuccess={handleSuccess}
      onError={(error) => console.log('Pluggy Connect Error:', error)}
    />
  )
};

const useDynamicImport = <T,>(importFunc: () => Promise<T>) => {
  const [component, setComponent] = useState<T | null>(null);
  const importedRef = useRef(false); // Para evitar múltiplas importações

  useEffect(() => {
    if (importedRef.current) return;
    
    const loadComponent = async () => {
      importedRef.current = true;
      try {
        const mod = await importFunc();
        setComponent(() => mod);
      } catch (error) {
        importedRef.current = false;
        console.error('Failed to load component:', error);
      }
    };
    loadComponent();
  }, [importFunc]);

  return component;
};