const variants = {
  default: 'bg-slate-100 text-slate-700 ring-slate-200/60',
  brand: 'bg-brand-50 text-brand-700 ring-brand-200/60',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200/60',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200/60',
  danger: 'bg-red-50 text-red-700 ring-red-200/60',
  purple: 'bg-violet-50 text-violet-700 ring-violet-200/60',
};

const Badge = ({ children, variant = 'default', className = '' }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${variants[variant]} ${className}`}
  >
    {children}
  </span>
);

export default Badge;
