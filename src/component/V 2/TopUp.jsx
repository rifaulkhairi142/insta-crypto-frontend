import React from 'react';
import { UserPlus, CreditCard, TrendingUp, Wallet } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up in minutes with our simple verification process. Get started with just your email.',
      step: '01'
    },
    {
      icon: CreditCard,
      title: 'Fund Your Account',
      description: 'Deposit funds using bank transfer, credit card, or other cryptocurrencies with instant processing.',
      step: '02'
    },
    {
      icon: TrendingUp,
      title: 'Start Trading',
      description: 'Choose from 300+ cryptocurrencies and start trading with our intuitive interface.',
      step: '03'
    },
    {
      icon: Wallet,
      title: 'Secure & Withdraw',
      description: 'Keep your crypto secure in our platform or withdraw to your personal wallet anytime.',
      step: '04'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Getting started with cryptocurrency trading has never been easier. 
            Follow these simple steps to begin your crypto journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm z-10">
                  {step.step}
                </div>
                
                {/* Icon Background */}
                <div className="w-20 h-20 bg-gray-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-gray-600 group-hover:border-yellow-400 transition-all duration-300 group-hover:transform group-hover:scale-110">
                  <step.icon className="h-10 w-10 text-yellow-400" />
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-400/50 to-transparent transform translate-x-4"></div>
                )}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;