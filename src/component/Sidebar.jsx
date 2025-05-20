import { ChevronFirst, ChevronLast } from "lucide-react";
import React, { Children, createContext } from "react";
import logo from "../../public/insta-crypto.png";
import { SidebarContect } from "./SidebarContext";



const Sidebar = ({ sidebarOpen, setSidebarOpen, children }) => {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gray shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              sidebarOpen ? "w-12" : "w-0 hidden"
            }`}
          />
          {/* <span className="font-binance-plex font-bold text-lightning-yellow-400">INSTA-CRYPTO</span> */}
          <button
            className="p-1.5 rounded-lg cursor-pointer h-fit ring-1 w-fit text-TextOnGray"
            onClick={() => setSidebarOpen((curr) => !curr)}
          >
            {sidebarOpen ? <ChevronFirst size={15} /> : <ChevronLast size={15} />}
          </button>
        </div>
        <SidebarContect.Provider value={{sidebarOpen}}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContect.Provider>
      </nav>
    </aside>
  );
};

export default Sidebar;
