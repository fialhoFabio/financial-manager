export default async function OTPPage() {
  return (
    <div>
      <title>OTP</title>
      <h1 className="text-4xl font-bold tracking-tight">OTP</h1>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};