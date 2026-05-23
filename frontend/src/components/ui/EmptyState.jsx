const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
    {Icon && (
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80">
        <Icon className="text-slate-400" size={26} />
      </div>
    )}
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    {description && (
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p>
    )}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
