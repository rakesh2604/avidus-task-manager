/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type, message) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => removeToast(id), 4500);
    },
    [removeToast]
  );

  const success = useCallback((msg) => addToast('success', msg), [addToast]);
  const error = useCallback((msg) => addToast('error', msg), [addToast]);
  const info = useCallback((msg) => addToast('info', msg), [addToast]);

  const styles = {
    success: {
      wrap: 'bg-white ring-emerald-200/80',
      icon: 'text-emerald-500',
      text: 'text-slate-800',
      Icon: FiCheckCircle,
    },
    error: {
      wrap: 'bg-white ring-red-200/80',
      icon: 'text-red-500',
      text: 'text-slate-800',
      Icon: FiXCircle,
    },
    info: {
      wrap: 'bg-white ring-brand-200/80',
      icon: 'text-brand-500',
      text: 'text-slate-800',
      Icon: FiInfo,
    },
  };

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <div className="pointer-events-none fixed top-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 p-4 sm:p-0">
        {toasts.map(({ id, type, message }) => {
          const { wrap, icon, text, Icon } = styles[type] || styles.info;
          return (
            <div
              key={id}
              className={`animate-toast-in pointer-events-auto flex items-start gap-3 rounded-xl p-4 shadow-lg ring-1 ${wrap}`}
            >
              <Icon className={`mt-0.5 shrink-0 ${icon}`} size={18} />
              <p className={`flex-1 text-sm font-medium leading-snug ${text}`}>{message}</p>
              <button
                type="button"
                onClick={() => removeToast(id)}
                className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <FiX size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
