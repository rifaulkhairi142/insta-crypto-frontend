import React from "react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-[100] h-24 py-3 font-binance-plex font-bold px-3 flex w-full items-center bg-gray text-lightning-yellow-400 justify-between">
      {/* {!sidebarOpen && <span>INSTA CRYPTO</span>} */}
      <span>INSTA CRYPTO</span>
      <div className="flex flex-row gap-x-2">
        <button className="bg-BasicBg text-textSecondary hover:bg-BasicBg/60 hover:text-textSecondary/60 font-medium cursor-pointer  rounded-sm font-binance-plex p-1.5">
          Masuk
        </button>
        <button className="bg-lightning-yellow-400 cursor-pointer hover:bg-lightning-yellow-400/60 rounded-sm text-textBlack font-normal font-binance-plex p-1.5">
          Daftar
        </button>
        
      </div>
    </header>
  );
};

export default Header;
