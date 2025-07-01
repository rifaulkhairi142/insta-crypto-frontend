import React, { useEffect, useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import axios from "axios";
import config from "../../config/config";
import FaqSkeleton from '../V 2/UI/FAQSkeleton';

const FAQ = () => {
  const [openItems, setOpenItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faqData, setFaqData] = useState(null);

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  
  useEffect(() => {
    getFAQs();
  }, []);
  const getFAQs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.base_url}/faqs`);
      setFaqData(res.data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang exchange di InstaCrypto
          </p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <FaqSkeleton />
          ) : (
            faqData?.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-gray-600"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-white pr-8" dangerouslySetInnerHTML={{ __html: faq.question }}>
                  </h3>
                  <div
                    className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                  >
                    {openItems.includes(index) ? (
                      <Minus className="h-5 w-5 text-gray-900" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-900" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openItems.includes(index)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-700 pt-6">
                      <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }}>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact Support */}
        {/* <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Masih Ada Pertanyaan?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Tim customer support kami siap membantu Anda 24/7. Jangan ragu
              untuk menghubungi kami kapan saja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105">
                Live Chat Support
              </button>
              <button className="border-2 border-blue-500 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-500/10 transition-all duration-200">
                Email Support
              </button>
            </div>
          </div>
        </div> */}

        {/* Quick Links */}
        {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-6 w-6 text-green-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Trading Guide</h4>
            <p className="text-gray-400 text-sm">
              Pelajari dasar-dasar trading cryptocurrency
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">API Documentation</h4>
            <p className="text-gray-400 text-sm">
              Dokumentasi lengkap untuk developer
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Security Center</h4>
            <p className="text-gray-400 text-sm">
              Tips keamanan dan best practices
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FAQ;
