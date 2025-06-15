import { useState, useEffect } from "react";

const InputCurrency = ({ label, onChange, value }) => {
  const [displayValue, setDisplayValue] = useState("");
  const [active, setActive] = useState(false);
  const [min, setMin] = useState(10000);
  const [max, setMax] = useState(5000000);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


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

  const handleMinimalClick = (e) => {
    e.stopPropagation();
    console.log("minimal");
    const rawValue = min;
    setDisplayValue(formatCurrency(rawValue));
    onChange(rawValue);

  }

  const handleMaksimalClick = (e) => {
    e.stopPropagation();
    console.log("maksimal");
    const rawValue = max;
    setDisplayValue(formatCurrency(rawValue));
    onChange(rawValue);

  }

  return (
    <div className="relative flex w-full h-fit">
      <div className="relative w-full flex gap-y-2 flex-col text-white ring-1 hover:ring-primary ring-InputLine rounded-lg p-2">
        <span className="font-binance-plex font-normal text-sm text-textPrimary">
          {label}
        </span>
        <div className="flex flex-row gap-1 items-center w-full">
          <input
            placeholder="Jumlah"
            onFocus={() => setActive(true)}
            onBlur={()=>setTimeout(() => setActive(false), 200)}
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            className="w-full font-binance-plex text-xl font-bold text-textPrimary border-none outline-none ring-0 bg-transparent"
          />
        </div>
      </div>
      {active && (
        <div className="absolute z-10 gap-x-24 w-full justify-center text-textPrimary -bottom-10 flex flex-row">
          <div  className="px-3 py-1 bg-bg1 rounded-md cursor-pointer">minimal: <button onClick={handleMinimalClick} className="text-textBrand hover:underline">{formatCurrency(min)}</button></div>
          <div   className="px-3 py-1 bg-bg1 rounded-md cursor-pointer">maksimal: <button onClick={handleMaksimalClick} className="text-textBrand hover:underline">{formatCurrency(max)}</button></div>
        </div>
      )}
    </div>
  );
};

export default InputCurrency;
