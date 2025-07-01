import React from 'react';

const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-700 rounded ${className}`} />
);

const HeroSkeleton = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23374151%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <SkeletonBox className="h-8 w-8" />
              <SkeletonBox className="h-4 w-48" />
            </div>

            <SkeletonBox className="h-16 w-full lg:w-3/4" />
            <SkeletonBox className="h-6 w-full lg:w-2/3" />

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <SkeletonBox className="h-14 w-full sm:w-48" />
              <SkeletonBox className="h-14 w-full sm:w-48" />
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-700">
              <SkeletonBox className="h-10 w-full" />
              <SkeletonBox className="h-10 w-full" />
              <SkeletonBox className="h-10 w-full" />
            </div>
          </div>

          {/* Right Skeleton (Crypto Cards) */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <SkeletonBox className="h-6 w-32" />
              <SkeletonBox className="h-4 w-16" />
            </div>

            <div className="space-y-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <SkeletonBox className="h-10 w-10 rounded-full" />
                    <div>
                      <SkeletonBox className="h-4 w-24 mb-1" />
                      <SkeletonBox className="h-3 w-12" />
                    </div>
                  </div>
                  <div className="text-right">
                    <SkeletonBox className="h-4 w-20 mb-1" />
                    <SkeletonBox className="h-3 w-12" />
                  </div>
                </div>
              ))}
            </div>

            <SkeletonBox className="h-12 w-full mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
