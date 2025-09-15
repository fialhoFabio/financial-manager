'use client';

import { useAtom } from "jotai";
import { togglePluggyModalAtom } from "@/utils/jotai";

export const PluggyButtonModal = () => {
  const [,togglePluggyModal] = useAtom(togglePluggyModalAtom);
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={togglePluggyModal}>
      Connect with Pluggy
    </button>
  );
};