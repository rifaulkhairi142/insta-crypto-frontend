import React, { Children, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Header from '../component/Header'
import SidebarItem from '../component/SidebarItem';
import { History, HomeIcon, LayoutDashboard, User } from 'lucide-react';
import CryptoPrice from '../component/CryptoPrice';
import Footer from '../component/Footer';
import CustomerService from '../component/CustomerService'
import TopLoader from '../component/TopLoader';


const  GuestLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  return (
    <div className="bg-black h-screen flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <SidebarItem icon={<HomeIcon size={20} />} text="Home" active={true} alert link="/"/>
        <SidebarItem icon={<History size={20} />} text="History" alert link="/transactions"/>
        <SidebarItem icon={<User size={20} />} text="Profile" alert />
      </Sidebar>

      {/* REMOVE overflow-hidden from this wrapper */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Sticky header works now */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <TopLoader />

        <main className="flex-1 px-4">
          <div className="mx-auto max-w-6xl pt-20">
            {children}
            {/* <CryptoPrice /> */}
          </div>
        </main>
        <CustomerService/>
        
        <Footer/>
      </div>
    </div>
  );
};
export default GuestLayout;
