const variants = {
  primary:
    'bg-brand-600 text-white shadow-sm shadow-brand-600/20 hover:bg-brand-700 focus-visible:ring-brand-500',
  secondary:
    'bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-400',
  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500',
  success:
    'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-500',
  outline:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:ring-slate-400',
  ghost:
    'text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-400',
};

const sizes = {
  sm: 'h-8 gap-1.5 rounded-lg px-3 text-xs',
  md: 'h-10 gap-2 rounded-xl px-4 text-sm',
  lg: 'h-12 gap-2 rounded-xl px-6 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => (
  <button
    disabled={disabled || loading}
    className={`inline-flex items-center justify-center font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {loading && (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    )}
    {children}
  </button>
);

export default Button;
