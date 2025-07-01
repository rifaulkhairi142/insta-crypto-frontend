import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-700/40 animate-pulse rounded ${className}`} />
);

const TransactionHistorySkeleton = () => {
  return (
    <div className="flex justify-center bg-gray-900">
      <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <SkeletonBox className="w-48 h-5" />
          <SkeletonBox className="w-72 h-8" />
          <SkeletonBox className="w-64 h-4" />
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SkeletonBox className="h-12 w-full" />
            <SkeletonBox className="h-12 w-full" />
            <SkeletonBox className="h-12 w-full" />
            <SkeletonBox className="h-12 w-full" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <th key={i} className="px-6 py-4">
                        <SkeletonBox className="w-24 h-4" />
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill(0)
                  .map((_, rowIdx) => (
                    <tr key={rowIdx} className="border-t border-gray-700">
                      {Array(8)
                        .fill(0)
                        .map((_, colIdx) => (
                          <td key={colIdx} className="px-6 py-4">
                            <SkeletonBox className="h-4 w-full max-w-[100px]" />
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 space-y-3"
              >
                <SkeletonBox className="h-6 w-24" />
                <SkeletonBox className="h-4 w-32" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistorySkeleton;
