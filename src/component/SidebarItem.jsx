import React, { createContext, useContext } from 'react'
import { SidebarContect } from './SidebarContext';



const SidebarItem = ({icon, text, active, alert}) => {
    const {sidebarOpen} = useContext(SidebarContect);
  return (
    <li className={`relative flex  items-center py-2 px-3 my-1 
        font-medium rounded-md cursor-pointer transition-colors ${active 
            ? " text-lightning-yellow-400 bg-black" 
            : "hover:text-lightning-yellow-400 hover:bg-black text-SecondaryText"}`
    }>{icon} <span className={`transition-all font-binance-plex ${sidebarOpen ? "w-52 ml-3 block": "hidden"}`}>{text}</span></li>
  )
}

export default SidebarItem