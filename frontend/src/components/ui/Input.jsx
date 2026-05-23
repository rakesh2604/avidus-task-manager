import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = forwardRef(
  (
    {
      label,
      error,
      hint,
      type = 'text',
      className = '',
      inputClassName = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className={className}>
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:bg-slate-50 ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/15'
                : 'border-slate-200 hover:border-slate-300'
            } ${isPassword ? 'pr-11' : ''} ${inputClassName}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
