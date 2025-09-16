'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';

import { sessionAtom } from '@/utils/jotai/jotai';

import { Dropdown } from './dropdown';

const Avatar = () => {
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const [session] = useAtom(sessionAtom);

  if (!session) return null;
  return (
    <div className="relative">
      <img
        src={`https://ui-avatars.com/api/?name=${session.user?.email}`}
        alt="Avatar do usuário"
        className="w-8 h-8 border rounded-full cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropDownOpen)}
      />
      {isDropDownOpen && <Dropdown onClose={() => setIsDropdownOpen(false)} session={session} />}
    </div>
  );
};

export default Avatar;

