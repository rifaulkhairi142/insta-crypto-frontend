import React, { useState } from "react";
import { ChevronDown, MessageCircle, X } from "lucide-react";
import { MdMessage } from "react-icons/md";

const CusomterService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-binance-plex">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform origin-bottom-right">
          <div className="bg-linear-to-r from-bg3 to-bg6 text-white p-4 flex justify-between items-center">
            <div className="font-semibold flex gap-x-2">
              <MdMessage size={25} />
              <span>Bantuan</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <ChevronDown size={25} />
            </button>
          </div>
          <div className="p-4 h-[500px] bg-gray-50">
            <p className="text-center text-gray-500 my-4">
              Ada yang bisa kami bantu?
            </p>
            <div className="absolute bottom-4 left-4 right-4">
              <input
                type="text"
                placeholder="Tulis pesan..."
                className="w-full p-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-textBrand"
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
        className={`${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-textBrand hover:bg-textBrand/95"
        } text-textWhite p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <div className="flex gap-x-1 justify-center items-center">
          <MdMessage size={24} />
          {(showText || isOpen) && (
            <span className="text-lg font-bold">Chat</span>
          )}
        </div>
      </button>
    </div>
  );
};

export default CusomterService;
