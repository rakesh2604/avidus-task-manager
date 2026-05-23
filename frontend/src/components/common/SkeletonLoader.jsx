import Card from './Card';

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'stats') {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Card key={i} className="p-5">
            <div className="flex justify-between items-start">
              <div className="space-y-3 flex-1">
                <div className="h-3.5 w-20 bg-gray-100 rounded-md animate-pulse" />
                <div className="h-8 w-14 bg-gray-100 rounded-lg animate-pulse" />
              </div>
              <div className="w-9 h-9 bg-gray-100 rounded-xl animate-pulse shrink-0" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <div className="bg-gray-50 border-b border-gray-100 h-10 w-full animate-pulse" />
        <div className="divide-y divide-gray-50 bg-white">
          {items.map((i) => (
            <div key={i} className="flex gap-4 p-4 items-center">
              <div className="h-4 w-1/4 bg-gray-100 rounded-md animate-pulse" />
              <div className="h-4 w-1/3 bg-gray-100 rounded-md animate-pulse" />
              <div className="h-4 w-1/12 bg-gray-100 rounded-md animate-pulse" />
              <div className="h-4 w-1/12 bg-gray-100 rounded-md animate-pulse" />
              <div className="h-4 w-1/6 bg-gray-100 rounded-md animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i} className="flex items-center gap-3 p-3.5 bg-white border border-gray-100 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-1/3 bg-gray-100 rounded-md animate-pulse" />
              <div className="h-2 w-1/2 bg-gray-100 rounded-md animate-pulse" />
            </div>
            <div className="h-3 w-16 bg-gray-100 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-3 w-16 bg-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-100 rounded-md animate-pulse" />
            <div className="h-3 w-full bg-gray-100 rounded-md animate-pulse" />
            <div className="h-3 w-5/6 bg-gray-100 rounded-md animate-pulse" />
          </div>
          <div className="h-3.5 w-24 bg-gray-100 rounded-md animate-pulse pt-2" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
