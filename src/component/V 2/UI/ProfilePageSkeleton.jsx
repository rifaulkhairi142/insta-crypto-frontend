import React from "react";

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-700/50 ${className}`}></div>
);

const ProfilePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-48 h-4 mb-4" />
          <Skeleton className="w-32 h-6 mb-2" />
          <Skeleton className="w-64 h-4" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-700/50 mx-auto mb-4"></div>
                <Skeleton className="w-40 h-4 mx-auto mb-1" />
                <Skeleton className="w-48 h-4 mx-auto mb-2" />
                <Skeleton className="w-32 h-6 mx-auto" />
              </div>
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                  >
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-16 h-4" />
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <Skeleton className="w-24 h-4 mx-auto mb-1" />
                <Skeleton className="w-32 h-4 mx-auto" />
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Info */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex justify-between mb-6">
                <Skeleton className="w-40 h-6" />
                <Skeleton className="w-20 h-8" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="w-24 h-4 mb-2" />
                    <Skeleton className="w-full h-10" />
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <Skeleton className="w-32 h-6 mb-6" />
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <div>
                      <Skeleton className="w-32 h-4 mb-1" />
                      <Skeleton className="w-40 h-3" />
                    </div>
                  </div>
                  <Skeleton className="w-16 h-4" />
                </div>
              </div>
            </div>

            {/* Notification Settings - Optional future skeleton */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
