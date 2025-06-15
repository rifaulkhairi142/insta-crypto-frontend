import { useRef, useState } from "react";
import { PiPlus } from "react-icons/pi";

const FAQItem = ({ item, onClick, isOpen }) => {
    const answereRef = useRef(null);
  return (
    <div className="flex flex-col transition-all cursor-pointer text-xl text-textPrimary font-semibold" id={`faq-item-${item.id}`}>
      <button className="flex flex-row cursor-pointer justify-between items-center" onClick={()=>onClick(item.id)}>
        <div className="flex gap-x-4 items-center">
          <span className="py-1 px-3 rounded-md ring ring-InputLine">
            {item.id}
          </span>
          <div>{item.question}</div>
        </div>
        <a className={`p-1 ring ring-BtnBg  transition-all ${isOpen ? "text-TextOnYellow  bg-BtnBg" : "text-white bg-BtnBg/15" } rounded-full`}>
          <PiPlus size={30} className={`${isOpen ? "rotate-45" : "rotate-0"} transition-transform cursor-pointer duration-300`}/>
        </a>
      </button>
      <div style={{maxHeight:isOpen ? answereRef.current?.scrollHeight : 0, opacity:isOpen?1:0}} id={`answere-${item.id}`} ref={answereRef} className="font-normal text-lg text-textSecondary mx-14 overflow-hidden transition-all duration-300 mt-5">{item.answere}</div>
    </div>
  );
};

export default FAQItem;
