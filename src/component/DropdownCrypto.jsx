import { ChevronDown, Delete, Search } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import config from "../config/config.js";

const DropdownCrypto = ({
  options = {},
  label,
  onChange,
  value,
  getOptionLabel = (option) => option.name,
  displayIcon = "logo",
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useRef(null);
  const isSelecting = useRef(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setSearchTerm(getOptionLabel(value));
    } else {
      setSearchTerm("");
    }
  }, [value]);

  const filteredOptions = searchTerm
    ? options.filter((itm) =>
        (getOptionLabel(itm) || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : options;

  const handleSelect = (itm) => {
    setOpen(false);
    onChange(itm);
    setSelectedCoin(itm);
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange(null);
    setSearchTerm("");
  };

  return (
    <div ref={ref} className="relative w-full h-fit">
      <div className="w-full gap-y-2 bg-gray-700/50 flex flex-col text-white ring-1 hover:ring-primary ring-InputLine rounded-lg p-2">
        <span className="font-binance-plex font-normal text-textPrimary">
          {label}
        </span>
        <div
          className="flex flex-row gap-1 items-center w-full"
          onClick={() => setOpen(true)}
        >
          <div className="w-full cursor-pointer flex  gap-x-2 font-binance-plex text-xl font-bold text-textPrimary border-none outline-none ring-0 min-h-11 bg-transparent">
            {selectedCoin && (
              <div className="flex gap-x-2">
                <img
                  className="w-8 h-8"
                  src={`${config.base_url}/${selectedCoin?.CryptoCoin.logo}`}
                />
                <p className="uppercase">{selectedCoin?.CryptoCoin.kode}</p>
              </div>
            )}
          </div>

          {searchTerm && (
            <button
              type="button"
              className="flex cursor-pointer w-5"
              onClick={clearSelection}
            >
              <Delete />
            </button>
          )}
          <ChevronDown size={20}/>
        </div>
      </div>

      {open && (
        <div className="absolute z-[9999] bg-bg3 flex flex-col top-0 w-full rounded-md p-1">
          <div className="flex flex-col">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5 pointer-events-none" />
              <input
                className="text-white font-binance-plex py-3 w-full pl-10 bg-transparent outline-none"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
            <hr className="border-t border-t-InputLine" />
          </div>
          <ul
            id="dropdown"
            className=" coin-scroll py-2 rounded-lg  max-h-30 overflow-y-auto"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((itm, index) => (
                <li
                  key={itm.id || index}
                  className="hover:bg-bg4/30 text-white py-3 px-2 cursor-pointer bg-bas"
                  onClick={() => handleSelect(itm)}
                  onMouseDown={() => (isSelecting.current = true)}
                >
                  <div className="flex flex-row gap-x-2 items-center">
                    {itm?.CryptoCoin[displayIcon] && (
                      <img
                        src={config.base_url + "/" + itm?.CryptoCoin[displayIcon]}
                        className="w-6 h-6"
                        alt=""
                      />
                    )}
                    <span>{getOptionLabel(itm)}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-white px-4 py-2">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCrypto;
