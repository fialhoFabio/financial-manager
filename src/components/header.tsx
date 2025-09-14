import { Link } from 'waku';
import Avatar from './avatar';

export const Header = () => {
  return (
    <header className="flex justify-between w-full px-4 h-12 items-center">
      <h2 className="text-lg font-bold tracking-tight">
        <Link to="/">Financial Manager</Link>
      </h2>

      <Avatar />
    </header>
  );
};
