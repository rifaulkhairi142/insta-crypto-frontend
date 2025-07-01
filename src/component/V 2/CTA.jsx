import React from 'react';
import { ArrowRight, Smartphone } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
            Join millions of users who trust InstaCrypto for secure, fast, and reliable cryptocurrency trading.
            Start your journey today with zero fees on your first trade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
              <span>Create Free Account</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white transition-all duration-200 flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>Download App</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-900">
            <div>
              <div className="text-3xl font-bold">0%</div>
              <div className="text-sm opacity-80">First Trade Fee</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Customer Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5 min</div>
              <div className="text-sm opacity-80">Account Setup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;