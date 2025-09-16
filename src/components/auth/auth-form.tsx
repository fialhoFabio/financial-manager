import { TAuthOption } from '@/types/auth.types';

export const AuthForm = (option: TAuthOption) => {
  return (
    <div>
      <p>Form for {option.label} goes here.</p>
    </div>
  );
}