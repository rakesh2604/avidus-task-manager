const Pagination = ({ page, pages, onChange }) => {
  if (pages <= 1) return null;

  return (
    <nav className="mt-8 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`h-9 min-w-9 rounded-lg text-sm font-medium transition-all ${
            p === page
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 ring-1 ring-slate-200 hover:bg-white'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
