import { Eye, EyeClosed, EyeIcon, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";

const PasswordInput = ({ label, placeholder, value, onChange, ...props }) => {
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    console.log("tes" , open);

  }, [open])
  return (
    <div className="relative flex w-full h-fit">
      <div className="relative gap-y-2 w-full flex flex-col ">
        <span className="font-binance-plex font-semibold text-sm text-textPrimary">
          {label}
        </span>
        <div className="flex flex-row gap-1 items-center w-full text-white ring-1 hover:ring-primary ring-InputLine rounded-lg p-2">
          <input
            inputMode="text"
            value={value}
            {...props}
            type={`${open ? "text" : "password"}`}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
            className="w-full font-binance-plex py-1 text-md font-semibold text-textPrimary border-none outline-none ring-0 bg-transparent"
          />
          <button
            className="text-textSecondary cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <Eye />: <EyeOff />}
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
