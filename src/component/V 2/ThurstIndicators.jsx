import React from 'react';
import { Shield, Award, Users, Globe } from 'lucide-react';

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Shield,
      title: 'Regulated & Compliant',
      description: 'Licensed and regulated in multiple jurisdictions with full compliance to international standards.'
    },
    {
      icon: Award,
      title: 'Industry Awards',
      description: 'Recognized as "Best Crypto Exchange 2024" by multiple financial technology publications.'
    },
    {
      icon: Users,
      title: '2M+ Satisfied Users',
      description: 'Trusted by millions of users worldwide with 99.9% uptime and 24/7 customer support.'
    },
    {
      icon: Globe,
      title: 'Global Presence',
      description: 'Operating in 100+ countries with local support and multiple fiat currency options.'
    }
  ];

  return (
    <section className="py-20 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the growing community of traders who trust InstaCrypto for their cryptocurrency needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <indicator.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">
                {indicator.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className="mt-16 pt-16 border-t border-gray-800">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Security & Compliance</h3>
            <p className="text-gray-300">Your security is our top priority</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
              <span className="text-white font-semibold">ISO 27001</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
              <span className="text-white font-semibold">SOC 2 Type II</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
              <span className="text-white font-semibold">CCSS Level 3</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
              <span className="text-white font-semibold">PCI DSS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;