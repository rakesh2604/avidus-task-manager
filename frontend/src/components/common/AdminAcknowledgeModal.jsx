import { useEffect } from 'react';
import { FiShield, FiCheckCircle } from 'react-icons/fi';

const AdminAcknowledgeModal = ({ isOpen, onConfirm }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Card — no overflow-hidden so nothing gets clipped */}
      <div className="relative bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.18)] w-full max-w-lg mx-auto animate-modal-in">

        {/* Top accent bar — border-radius handled manually */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand via-[#7C6FF7] to-[#A78BFA] rounded-t-2xl" />

        {/* Content */}
        <div style={{ padding: '32px 48px 40px 48px' }}>

          {/* Icon + Title inline */}
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: '8px' }}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EEF2FF] to-[#DDD6FE] flex items-center justify-center shrink-0">
              <FiShield size={18} className="text-brand" />
            </div>
            <h2 id="admin-modal-title" className="text-[19px] font-bold text-[#1E1E2F]">
              Admin Access Notice
            </h2>
          </div>

          {/* Accent line */}
          <div className="w-8 h-[3px] rounded-full bg-brand mx-auto" style={{ marginBottom: '20px' }} />

          {/* Body */}
          <div className="text-[13.5px] text-[#4B5563] leading-[1.65] text-left" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p>
              You are about to access the{' '}
              <span className="font-semibold text-[#1E1E2F]">Administrator Dashboard</span>.
            </p>
            <p>
              The <span className="font-semibold text-[#1E1E2F]">Admin role is intentionally
              open during registration</span> to enable transparent RBAC evaluation as part
              of an assignment assessment.
            </p>
            <p>
              In production, admin access would be granted only by a system administrator —
              never self-selectable.
            </p>
          </div>

          {/* Disclaimer chip */}
          <div
            className="flex items-start gap-2.5 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl"
            style={{ marginTop: '20px', padding: '12px 14px' }}
          >
            <FiCheckCircle size={14} className="text-brand shrink-0 mt-[2px]" />
            <p className="text-[12px] text-[#6D28D9] leading-relaxed">
              By proceeding, you acknowledge this access is for evaluation purposes only.
            </p>
          </div>

          {/* CTA Button — explicit 24px gap above */}
          <button
            onClick={onConfirm}
            style={{ marginTop: '24px' }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand to-[#7C6FF7] text-white text-[13.5px] font-semibold tracking-wide shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.98] transition-all duration-150"
          >
            I Understand — Continue to Dashboard
          </button>

        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modal-in {
          animation: modalIn 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminAcknowledgeModal;
