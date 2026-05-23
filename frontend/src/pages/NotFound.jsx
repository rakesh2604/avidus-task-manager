import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4">
    <p className="text-8xl font-bold tracking-tighter text-slate-200">404</p>
    <h1 className="mt-4 text-xl font-semibold text-slate-900">Page not found</h1>
    <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
      The page you&apos;re looking for doesn&apos;t exist or has been moved.
    </p>
    <Link to="/dashboard" className="mt-8">
      <Button>Back to dashboard</Button>
    </Link>
  </div>
);

export default NotFound;
