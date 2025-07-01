// components/CoinInfoSkeleton.jsx
import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-700 rounded ${className}`} />
);

const CoinInfoSkeleton = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <SkeletonBox className="h-10 w-64 mb-8" />

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <SkeletonBox className="h-12 w-full" />
                <SkeletonBox className="h-12 w-full" />
                <SkeletonBox className="h-12 w-full" />
              </div>

              <div className="space-y-6">
                <SkeletonBox className="h-48 w-full" />
                <SkeletonBox className="h-20 w-full" />
              </div>
            </div>

            <div className="mt-8">
              <SkeletonBox className="h-6 w-48 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <SkeletonBox key={i} className="h-24 w-full" />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SkeletonBox className="h-14 w-full" />
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonBox key={i} className="h-20 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinInfoSkeleton;
