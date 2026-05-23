import { Link } from 'react-router-dom';
import { FiShield, FiUsers, FiBarChart2, FiLayout } from 'react-icons/fi';

const features = [
  { icon: FiShield, text: 'Secure JWT Authentication' },
  { icon: FiUsers, text: 'Role Based Access Control' },
  { icon: FiBarChart2, text: 'Task Analytics' },
  { icon: FiLayout, text: 'Admin Dashboard' },
];

const AuthLayout = ({ children, footer }) => (
  <div className="flex min-h-screen">
    {/* Brand panel */}
    <div className="auth-mesh relative hidden w-[48%] flex-col justify-between overflow-hidden p-10 text-white lg:flex xl:p-14">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
            <span className="text-lg font-bold">A</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">Avidus</span>
        </div>
      </div>

      <div className="relative z-10 max-w-md">
        <h1 className="text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
          Avidus Task Manager
        </h1>
        <p className="mt-4 text-base leading-relaxed text-indigo-100/90">
          Enterprise-grade task management with role-based permissions, real-time
          analytics, and a unified admin workspace.
        </p>
        <ul className="mt-10 space-y-4">
          {features.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-indigo-50">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <Icon size={16} />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-10 text-xs text-indigo-200/70">
        © {new Date().getFullYear()} Avidus Interactive
      </p>
    </div>

    {/* Form panel */}
    <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-center gap-2.5 lg:hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
          A
        </div>
        <span className="font-semibold text-slate-900">Avidus Task Manager</span>
      </div>

      <div className="glass-panel w-full max-w-[420px] rounded-2xl p-8 sm:p-10">
        {children}
      </div>

      {footer && <div className="mt-8 text-center text-sm text-slate-500">{footer}</div>}
    </div>
  </div>
);

export default AuthLayout;
