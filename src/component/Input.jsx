import { useState, useEffect } from "react";

const Input = ({ label, onChange, value }) => {
  
  return (
    <div className="relative flex w-full h-fit">
      <div className="relative gap-y-2 w-full flex flex-col text-white ring-1 hover:ring-primary ring-InputLine rounded-lg p-2">
        <span className="font-binance-plex font-normal text-sm text-textPrimary">
          {label}
        </span>
        <div className="flex flex-row gap-1 items-center w-full">
          <input
            inputMode="text"
            value={value}
            onChange={(e)=>onChange(e)}
            className="w-full font-binance-plex text-xl font-bold text-textPrimary border-none outline-none ring-0 bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
