const Spinner = ({ size = 'md' }) => {
  const dim = size === 'sm' ? 'h-6 w-6 border-2' : size === 'lg' ? 'h-12 w-12 border-[3px]' : 'h-9 w-9 border-[3px]';
  return (
    <div
      className={`animate-spin rounded-full border-brand-600 border-t-transparent ${dim}`}
      role="status"
      aria-label="Loading"
    />
  );
};

const Loader = ({ fullScreen = true, size = 'md' }) => {
  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-16">
      <Spinner size={size} />
    </div>
  );
};

export default Loader;
