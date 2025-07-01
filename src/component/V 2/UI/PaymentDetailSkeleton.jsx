import { ArrowLeft } from "lucide-react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-700 rounded ${className}`} />
);

const PaymentDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 py-4 px-6">
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Back Link */}
        <div className="flex items-center space-x-2 text-gray-300">
          <ArrowLeft className="h-4 w-4" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Header Detail */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>

        {/* Expiration Timer */}
        <div className="rounded-2xl p-6 border-2 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div>
                <Skeleton className="h-5 w-48 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-10 w-24 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-3 w-full rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Transaction Info */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* QRIS */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                  <Skeleton className="w-48 h-48 mb-4 rounded-2xl" />
                  <Skeleton className="h-5 w-32 mb-2 rounded-lg" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                  <Skeleton className="h-4 w-48 mt-4" />
                </div>
              </div>
            </div>

            {/* Expired Notice */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center">
              <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto mb-4" />
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Skeleton className="h-10 w-48 rounded-lg" />
                <Skeleton className="h-10 w-48 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-4">
              <Skeleton className="h-6 w-40 mb-2" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            {/* Help */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailSkeleton;
