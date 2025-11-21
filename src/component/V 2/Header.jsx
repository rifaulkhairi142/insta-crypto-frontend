import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  Menu,
  X,
  Zap,
  User,
  History,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { LoutOut, reset } from "../../features/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();



  const { user } = useOutletContext();

  const logout = () => {
      dispatch(LoutOut());
      dispatch(reset());
      navigate("/login");
    };
  

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-gray-900" />
            </div> */}
            <div className="">
              <img className="w-12 h-12" src="/insta-crypto.png"/>
            </div>
            <span className="text-xl font-bold text-white">InstaCrypto</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#markets"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Markets
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <Link
                to="/login"
                className="flex items-center cursor-pointer space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <span>Masuk</span>
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-900" />
                  </div>
                  <span>{user?.name}</span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/transaction-history"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <History className="h-4 w-4" />
                      <span>Riwayat Transaksi</span>
                    </Link>
                    <div className="border-t border-gray-700 my-2"></div>
                    <button className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors duration-200 w-full text-left" onClick={()=>logout()}>
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* User Menu */}

            {/* <Link 
              to="/register"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105"
            >
              Start Trading
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900 border-b border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#home"
                className="block text-gray-300 hover:text-yellow-400"
              >
                Home
              </a>
              <a
                href="#features"
                className="block text-gray-300 hover:text-yellow-400"
              >
                Features
              </a>
              <a
                href="#markets"
                className="block text-gray-300 hover:text-yellow-400"
              >
                Markets
              </a>
              <a
                href="#about"
                className="block text-gray-300 hover:text-yellow-400"
              >
                About
              </a>
              <a
                href="#contact"
                className="block text-gray-300 hover:text-yellow-400"
              >
                Contact
              </a>

              <div className="border-t border-gray-800 pt-4 space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/transaction-history"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <History className="h-4 w-4" />
                  <span>Riwayat Transaksi</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-lg font-semibold text-center block"
                >
                  Start Trading
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
