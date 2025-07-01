import React from "react";
import { Zap, Twitter, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              {/* <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-gray-900" />
              </div> */}
              <div className="">
                <img className="w-12 h-12" src="/insta-crypto.png" />
              </div>
              <span className="text-xl font-bold text-white">InstaCrypto</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Beli Crypto Instan & Aman dalam Hitungan Detik
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Pertukaran
                </a>
              </li>
              {/* <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Futures Trading</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Options Trading</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Staking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">DeFi Earn</a></li> */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Help Center
                </a>
              </li>
              {/* <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Trading Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">API Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Contact Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">System Status</a></li> */}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
              {/* <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Press Kit</a></li> */}
              {/* <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">Legal & Privacy</a></li> */}
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 InstaCrypto. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
