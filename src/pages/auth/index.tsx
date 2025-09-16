import { SupabaseAuth } from '@/components/auth/supabase-auth';

export default async function AuthPage() {
  return (
    <div>
      <title>Login</title>
      <h1 className="text-4xl font-bold tracking-tight">Login</h1>
      <SupabaseAuth />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};