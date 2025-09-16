import { Session } from '@supabase/supabase-js';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { logoutAtom } from '@/utils/jotai';

interface DropdownProps {
  onClose: () => void;
  session: Session;
}

export const Dropdown = ({ onClose, session }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, logout] = useAtom(logoutAtom);
  useCloseOnOutsideClick(ref, onClose);
  return (
    <div className="absolute mt-2 right-0 border rounded shadow-lg" tabIndex={0} ref={ref}>
      <div className="px-4 py-2 text-gray-800 border-b">{session.user?.email}</div>
      <button
        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          logout();
          onClose();
        }}
      >
        Logout
      </button>
    </div>
  );
};

const useCloseOnOutsideClick = (ref: React.RefObject<HTMLDivElement | null>, onClose: () => void) => {
  useEffect(() => {
    console.log('Setting up outside click listener');
    const handleClick = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClose, ref]);
};
