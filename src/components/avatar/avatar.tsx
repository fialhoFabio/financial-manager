'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';

import { getUserAtom } from '@/utils/jotai/jotai';

import { Dropdown } from './dropdown';

const Avatar = () => {
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const [user] = useAtom(getUserAtom);

  if (!user) return null;
  return (
    <div className="relative">
      <img
        src={`https://ui-avatars.com/api/?name=${user.email}`}
        alt="Avatar do usuário"
        className="w-8 h-8 border rounded-full cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropDownOpen)}
      />
      {isDropDownOpen && <Dropdown onClose={() => setIsDropdownOpen(false)} user={user} />}
    </div>
  );
};

export default Avatar;

