import React from 'react';
import { Shield, Zap, TrendingUp, Smartphone, Lock, DollarSign } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Aman & Terpercaya',
      description: 'Transaksi dijamin aman dengan enkripsi terbaik.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Proses Instan',
      description: 'Beli crypto tanpa ribet, hitungan detik langsung dapat.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: DollarSign,
      title: 'Biaya Admin Termurah',
      description: 'Biaya lebih hemat dibanding platform lain.',
      color: 'from-green-400 to-emerald-500'
    },

 
    {
      icon: DollarSign,
      title: 'Pembayaran via QRIS',
      description: 'Praktis dan bisa pakai semua e-wallet atau m-banking.',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Kenapa memilih InstaCrypto?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Kami hadir untuk mempermudah pembelian crypto dengan proses yang cepat, biaya rendah, dan sistem pembayaran modern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;