import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 className="text-6xl font-bold text-gray-300">404</h1>
    <p className="mt-4 text-gray-600">Page not found</p>
    <Link to="/dashboard" className="mt-6 text-blue-600 hover:underline text-sm">
      Back to Dashboard
    </Link>
  </div>
);

export default NotFound;
