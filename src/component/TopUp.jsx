import React from "react";
import Dropdown from "./Dropdown";

import btcicon from "../../public/Bitcoin.png";
import ethicon from "../../public/Etherium.png";
import solicon from "../../public/Solana.png";
import xrpicon from "../../public/xrp.png";
import InputCurrency from "./InputCurrency";
import Input from "./Input";

const cryptoList = [
  { icon: btcicon, name: "BTC" },
  { icon: ethicon, name: "ETH" },
  { icon: solicon, name: "SOL" },
  { icon: xrpicon, name: "XRP" },
];

const TopUp = () => {
  const onCoinChange = (e) => {
    console.log(e);
  };

  const onAmountChange = (e) => {
    console.log(e);
  };
  return (
    <div className="flex w-full flex-col gap-y-2 ring-1 rounded-lg ring-bg4 h-fit p-4">
      <div className="flex w-full flex-col gap-y-2">
        <Dropdown
          label="Coin"
          value={null}
          getOptionLabel={(option) => option.name}
          options={cryptoList}
          onChange={(e) => onCoinChange(e)}
        />
        <InputCurrency label="Jumlah" onChange={(e) => onAmountChange(e)} />
        <Input label="Wallet Address" />
      </div>
      <div className="flex flex-col gap-3">
        <ul className=" grid grid-cols-2 gap-3 justify-end w-full text-white ">
          <li>
            <div>Coin</div>
            <div className="text-textSecondary">tes</div>
          </li>
          <li>
            <div className="font-bold">Jumlah</div>
            <div className="text-textSecondary">tes</div>
          </li>
          <li>
            <div>Biaya Admin</div>
            <div className="text-textSecondary">tes</div>
          </li>
          <li>
            <div>Total Pembayaran</div>
            <div className="text-textSecondary">tes</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopUp;
