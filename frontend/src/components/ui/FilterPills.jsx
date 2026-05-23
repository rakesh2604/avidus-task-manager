const FilterPills = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map(({ value: v, label }) => (
      <button
        key={v}
        type="button"
        onClick={() => onChange(v)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          value === v
            ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/25'
            : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default FilterPills;
