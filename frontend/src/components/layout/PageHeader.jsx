const PageHeader = ({ title, subtitle, action, badge }) => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {badge}
      </div>
      {subtitle && (
        <p className="mt-1.5 text-sm text-slate-500 sm:text-base">{subtitle}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default PageHeader;
