import { ChevronDown, Delete } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({
  options,
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
    setSearchTerm(getOptionLabel(itm));
    setOpen(false);
    onChange(itm);
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange(null);
    setSearchTerm("");
  };

  return (
    <div ref={ref} className="relative w-full h-fit">
      <div className="w-full gap-y-2 flex flex-col text-white ring-1 hover:ring-primary ring-InputLine rounded-lg p-2">
        <span className="font-binance-plex font-normal text-sm text-textPrimary">
          {label}
        </span>
        <div
          className="flex flex-row gap-1 items-center w-full"
          onClick={() => setOpen(true)}
        >
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              if (isSelecting.current) {
                isSelecting.current = false;
                return;
              }
              if (value) {
                setSearchTerm(getOptionLabel(value));
              } else {
                setSearchTerm("");
              }
            }}
            className="w-full font-binance-plex text-xl font-bold text-textPrimary border-none outline-none ring-0 bg-transparent"
          />

          {searchTerm && (
            <button
              type="button"
              className="flex cursor-pointer w-5"
              onClick={clearSelection}
            >
              <Delete />
            </button>
          )}
          <ChevronDown size={15} />
        </div>
      </div>

      {open && (
        <ul
          id="dropdown"
          className="absolute left-0 right-0 mt-1 py-2 rounded-lg z-20 bg-bg3 max-h-40 overflow-y-auto"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((itm, index) => (
              <li
                key={itm.id || index}
                className="hover:bg-bg4/30 text-white p-2 cursor-pointer"
                onClick={() => handleSelect(itm)}
                onMouseDown={() => (isSelecting.current = true)}
              >
                <div className="flex flex-row gap-x-1 items-center">
                  {itm[displayIcon] && (
                    <img src={itm[displayIcon]} className="w-4 h-4" alt="" />
                  )}
                  <span>{getOptionLabel(itm)}</span>
                </div>
              </li>
            ))
          ) : (
            <li className="text-white px-4 py-2">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
