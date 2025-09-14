import { Link } from 'waku';

import { PluggyConnector } from '@/components/pluggy/pluggy-connector';

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <PluggyConnector />
      <title>{data.title}</title>
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
      <p>{data.body}</p>
      <Link to="/auth" className="mt-4 inline-block underline">
        Auth page
      </Link>
      <br />
      <Link to="/about" className="mt-4 inline-block underline">
        About page
      </Link>
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'Waku',
    headline: 'Waku',
    body: 'Hello world! Teste :(',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
