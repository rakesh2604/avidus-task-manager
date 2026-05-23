/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type, message) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  const success = useCallback((msg) => addToast('success', msg), [addToast]);
  const error = useCallback((msg) => addToast('error', msg), [addToast]);
  const info = useCallback((msg) => addToast('info', msg), [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      {/* Toast Portal Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(({ id, type, message }) => {
          let bg = 'bg-white border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]';
          let text = 'text-gray-900';
          let Icon = FiInfo;
          let iconColor = 'text-brand';

          if (type === 'success') {
            bg = 'bg-green-50 border-green-100 shadow-[0_8px_30px_rgb(34,197,94,0.08)]';
            text = 'text-green-800';
            Icon = FiCheckCircle;
            iconColor = 'text-green-600';
          } else if (type === 'error') {
            bg = 'bg-red-50 border-red-100 shadow-[0_8px_30px_rgb(239,68,68,0.08)]';
            text = 'text-red-800';
            Icon = FiXCircle;
            iconColor = 'text-red-600';
          }

          return (
            <div
              key={id}
              className={`flex items-start gap-3 p-3.5 rounded-xl border pointer-events-auto animate-in slide-in-from-top-4 fade-in duration-300 ${bg}`}
            >
              <Icon className={`shrink-0 mt-0.5 ${iconColor}`} size={16} />
              <p className={`text-[13px] font-medium leading-normal flex-1 ${text}`}>
                {message}
              </p>
              <button
                onClick={() => removeToast(id)}
                className="text-gray-400 hover:text-gray-600 rounded p-0.5 transition-colors cursor-pointer"
              >
                <FiX size={14} />
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
