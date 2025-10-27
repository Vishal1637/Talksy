const LoadingSkeleton = ({ type = "card" }) => {
  if (type === "card") {
    return (
      <div className="card bg-base-200/60 border border-base-300/50 backdrop-blur-lg rounded-2xl overflow-hidden">
        <div className="card-body p-6 space-y-5">
          {/* Avatar and name skeleton */}
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-base-300/50 to-base-300/30 animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-base-300/30 to-base-300/20 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>

          {/* Languages skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-full w-20 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-full w-24 animate-pulse"></div>
          </div>

          {/* Bio skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gradient-to-r from-base-300/30 to-base-300/20 rounded animate-pulse"></div>
            <div className="h-3 bg-gradient-to-r from-base-300/30 to-base-300/20 rounded w-5/6 animate-pulse"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-10 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (type === "friend") {
    return (
      <div className="card-enhanced group relative overflow-hidden bg-base-200/60 border border-base-300/50 backdrop-blur-lg rounded-2xl">
        <div className="card-body p-5 relative z-10">
          {/* User info skeleton */}
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar size-14">
              <div className="rounded-full bg-gradient-to-r from-base-300/50 to-base-300/30 animate-pulse w-full h-full"></div>
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-base-300/30 to-base-300/20 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>

          {/* Languages skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-5 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-full w-16 animate-pulse"></div>
            <div className="h-5 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-full w-20 animate-pulse"></div>
          </div>

          {/* Buttons skeleton */}
          <div className="flex gap-3">
            <div className="h-8 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-full flex-1 animate-pulse"></div>
            <div className="h-8 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-full w-16 animate-pulse"></div>
            <div className="h-8 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-full w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
