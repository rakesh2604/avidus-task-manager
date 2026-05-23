const Card = ({ children, className = '', hover = false, padding = true }) => (
  <div
    className={`rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-card)] ${
      padding ? 'p-6' : ''
    } ${hover ? 'transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]' : ''} ${className}`}
  >
    {children}
  </div>
);

export default Card;
