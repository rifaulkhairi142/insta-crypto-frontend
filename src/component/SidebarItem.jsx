import React, { createContext, useCallback, useContext } from "react";
import { SidebarContect } from "./SidebarContext";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ icon, text, alert, link, include_link }) => {
  const location = useLocation();
  const { sidebarOpen } = useContext(SidebarContect);

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );
  return (
    <Link
      to={link}
      className={`relative flex  items-center py-2 px-3 my-1 
        font-medium rounded-md cursor-pointer transition-colors ${
          isActive(link) || location.pathname.includes(include_link)
            ? " text-lightning-yellow-400 bg-black"
            : "hover:text-lightning-yellow-400 hover:bg-black text-SecondaryText"
        }`}
    >
      {icon}{" "}
      <span
        className={`transition-all font-binance-plex ${
          sidebarOpen ? "w-52 ml-3 block" : "hidden"
        }`}
      >
        {text}
      </span>
    </Link>
  );
};

export default SidebarItem;
