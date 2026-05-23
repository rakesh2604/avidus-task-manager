import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/common/Button';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/user-dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>
        </>
      }
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500">Start managing tasks in minutes</p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder="Jane Doe"
        />
        <Input
          label="Email address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          autoComplete="new-password"
          placeholder="Minimum 6 characters"
          hint="Use at least 6 characters"
        />
        <Button type="submit" loading={loading} size="lg" className="mt-2 w-full">
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
