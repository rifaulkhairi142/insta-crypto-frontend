import { useState, useEffect } from "react";

const InputCurrency = ({ label, onChange, value }) => {
  const [displayValue, setDisplayValue] = useState("");

  // Format value to IDR currency
  const formatCurrency = (val) => {
    if (!val) return "";
    const number = parseInt(val.toString().replace(/\D/g, ""), 10);
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // On initial value update (from parent)
  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric
    setDisplayValue(formatCurrency(rawValue));
    onChange(rawValue); // Return numeric value to parent
  };

  return (
    <div className="relative flex w-full h-fit">
      <div className="relative w-full flex gap-y-2 flex-col text-white ring-1 hover:ring-primary ring-InputLine rounded-lg p-2">
        <span className="font-binance-plex font-normal text-sm text-textPrimary">
          {label}
        </span>
        <div className="flex flex-row gap-1 items-center w-full">
          <input
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            className="w-full font-binance-plex text-xl font-bold text-textPrimary border-none outline-none ring-0 bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default InputCurrency;
