

const NormalInput = ({ label, onChange, value, placeholder, ...props }) => {
  
  return (
    <div className="relative flex w-full h-fit">
      <div className="relative gap-y-2 w-full flex flex-col ">
        <span className="font-binance-plex font-semibold text-sm text-textPrimary">
          {label}
        </span>
        <div className="flex flex-row gap-1 items-center w-full text-white ring-1 hover:ring-primary ring-InputLine rounded-lg p-2">
          <input
            inputMode="text"
            {...props}
            value={value}
            onChange={(e)=>onChange(e)}
            placeholder={placeholder}
            className="w-full font-binance-plex py-1 text-md font-semibold text-textPrimary border-none outline-none ring-0 bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default NormalInput;
