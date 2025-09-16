'use client';

import type { Provider } from '@supabase/supabase-js';
import { useRouter } from 'waku';

import { TAuthOption } from '@/types/auth.types';
import { supabaseClient } from '@/utils/supabase/supabase-client';


export const SupabaseAuth = () => {
  const { push } = useRouter();

  const loginOptions: TAuthOption[] = [
    { label: 'Login with OTP', type: 'otp' },
    { label: 'Login with Google', type: 'oauth', provider: 'google' },
    { label: 'Login with GitHub', type: 'oauth', provider: 'github' },
  ];

  const handleOAuth = async (provider: Provider) => {
    const { error } = await supabaseClient.auth.signInWithOAuth({ provider });
    if (error) {
      alert('Error during OAuth sign-in: ' + error.message);
    }
  };

  return loginOptions.map((option) => (
    <button 
      className="mb-2 block rounded border border-gray-300 bg-white px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-50"
      key={option.label}
      onClick={option.type === 'otp' ? () => push('/auth/otp') : () => handleOAuth(option.provider!)}
    >
      {option.label}
    </button>
  ));
}
