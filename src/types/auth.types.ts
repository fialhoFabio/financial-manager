import { Provider } from '@supabase/supabase-js';

export type AuthType = 'otp' | 'oauth';

export interface BaseAuthOption {
  label: string;
  type: AuthType;
}

export interface OTPAuthOption extends BaseAuthOption {
  type: 'otp';
}

export interface OAuthAuthOption extends BaseAuthOption {
  type: 'oauth';
  provider: Provider;
}

export type TAuthOption = OTPAuthOption | OAuthAuthOption;