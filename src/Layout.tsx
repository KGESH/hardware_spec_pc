import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      {/* Todo: add a header*/}
      <nav className="flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Outlet />
    </div>
  );
}
