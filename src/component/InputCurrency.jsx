import { useState, useEffect } from "react";

const InputCurrency = ({ label, onChange, value }) => {
  const [displayValue, setDisplayValue] = useState("");
  const [active, setActive] = useState(false);
  const [min, setMin] = useState(10000);
  const [max, setMax] = useState(5000000);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); 
    const numericValue = parseInt(rawValue, 10);

    if (isNaN(numericValue)) {
      setError(true);
      setErrorMsg("Input tidak valid");
      setDisplayValue("");
      onChange(""); 
      return;
    }

    if (numericValue < min) {
      setError(true);
      setErrorMsg(`Minimal adalah ${formatCurrency(min)}`);
    } else if (numericValue > max) {
      setError(true);
      setErrorMsg(`Maksimal adalah ${formatCurrency(max)}`);
    } else {
      setError(false);
      setErrorMsg("");
    }

    setDisplayValue(formatCurrency(rawValue));
    onChange(rawValue); 
  };

  const handleMinimalClick = (e) => {
    e.stopPropagation();
    console.log("minimal");
    const rawValue = min;
    setDisplayValue(formatCurrency(rawValue));
    onChange(rawValue);
  };

  const handleMaksimalClick = (e) => {
    e.stopPropagation();
    console.log("maksimal");
    const rawValue = max;
    setDisplayValue(formatCurrency(rawValue));
    onChange(rawValue);
  };

  return (
    <div className="relative bg-gray-700/50 flex w-full h-fit">
      <div className={`relative w-full flex gap-y-2 flex-col text-white ring-1 hover:ring-primary ring-InputLine rounded-lg p-2 ${error ? "ring-error hover:ring-error":""}`}>
        <span className="font-binance-plex font-normal text-textPrimary">
          {label}
        </span>
        <div className="flex flex-row gap-1 items-center w-full">
          <input
            placeholder="Jumlah"
            onFocus={() => setActive(true)}
            onBlur={() => setTimeout(() => setActive(false), 200)}
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            className={`w-full font-binance-plex font-bold text-textPrimary border-none outline-none ring-0 bg-transparent`}
          />
        </div>
      </div>
      {active && (
        <div className="absolute z-10 gap-x-8 w-full justify-center text-textPrimary -bottom-10 flex flex-row">
          <div className="px-3 py-1 bg-bg1 rounded-md cursor-pointer">
            minimal:{" "}
            <button
              onClick={handleMinimalClick}
              className="text-textBrand hover:underline"
            >
              {formatCurrency(min)}
            </button>
          </div>
          <div className="px-3 py-1 bg-bg1 rounded-md cursor-pointer">
            maksimal:{" "}
            <button
              onClick={handleMaksimalClick}
              className="text-textBrand hover:underline"
            >
              {formatCurrency(max)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputCurrency;
