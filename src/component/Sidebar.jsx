import { ChevronFirst, ChevronLast } from "lucide-react";
import React, { Children, createContext } from "react";
import logo from "../../public/insta-crypto.png";
import { SidebarContect } from "./SidebarContext";
import { LuChevronsLeft } from "react-icons/lu";




const Sidebar = ({ sidebarOpen, setSidebarOpen, children }) => {
  return (
    <aside className="h-screen md:block hidden">
      <nav className="h-full flex flex-col bg-black  shadow-xl">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              sidebarOpen ? "w-12" : "w-0 hidden"
            }`}
          />
          {/* <span className="font-binance-plex font-bold text-lightning-yellow-400">INSTA-CRYPTO</span> */}
          <button
            className="p-1.5 rounded-lg cursor-pointer h-fit w-fit text-textSecondary hover:text-textBrand"
            onClick={() => setSidebarOpen((curr) => !curr)}
          >
            <LuChevronsLeft size={25} className={`${sidebarOpen ? "rotate-0" : "rotate-180"} transition-transform duration-500`}/>
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
