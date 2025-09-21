import { unstable_getHeaders } from 'waku/server';


export function getCookies(): { name: string; value: string; }[] | null {
  const cookieHeader = unstable_getHeaders()['cookie'] || '';
  if (!cookieHeader) return null;
  return cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, ...rest] = cookie.split('=');
    if (!name || rest.length === 0) return acc;
    acc.push({ name: name.trim(), value: rest.join('=').trim() });
    return acc;
  }, [] as { name: string; value: string; }[]);
}
