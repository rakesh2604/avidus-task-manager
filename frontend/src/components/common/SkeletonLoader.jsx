const pulse = 'animate-pulse rounded-lg bg-slate-100';

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'stats') {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className={`h-3.5 w-24 ${pulse}`} />
                <div className={`h-9 w-16 ${pulse}`} />
              </div>
              <div className={`h-12 w-12 shrink-0 rounded-xl ${pulse}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
        <div className={`h-12 border-b border-slate-100 ${pulse}`} />
        {items.map((i) => (
          <div key={i} className="flex gap-4 border-b border-slate-50 p-4 last:border-0">
            <div className={`h-4 w-1/4 ${pulse}`} />
            <div className={`h-4 w-1/3 ${pulse}`} />
            <div className={`h-4 w-16 ${pulse}`} />
            <div className={`h-4 w-20 ${pulse}`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <div key={i} className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6">
          <div className={`h-5 w-20 rounded-full ${pulse}`} />
          <div className={`h-5 w-3/4 ${pulse}`} />
          <div className={`h-4 w-full ${pulse}`} />
          <div className={`h-4 w-2/3 ${pulse}`} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
