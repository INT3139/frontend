import { Route as homeRoute } from '@/routes/(protected)/_authenticated/index';
import { Link } from '@tanstack/react-router';

function NotFound() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <Link to={homeRoute.to} className="text-blue-500 hover:text-blue-700">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
