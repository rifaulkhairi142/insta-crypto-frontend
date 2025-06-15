import { useState } from "react";
import { formatCurrencyToIDR } from "../Utils/IDRFormater.js";
import PrimaryButton from "../component/PrimaryButton.jsx";
import config  from "../config/config.js";
import {formateDate} from '../Utils/DateConverter.js';
import { useNavigate } from "react-router-dom";

const TransactionHistoryCard = ({ item = {} }) => {
  const navigage = useNavigate();

  return (
    <div className="flex flex-col p-4 border border-InputLine rounded-2xl">
      <div className="flex justify-between">
        <ul>
          <li className="font-bold text-lg">Coin</li>
          <li className="flex gap-x-2 mt-1">
            <img className="w-14 h-14" src={`${config.base_url}/${item.CryptoCoinNetwork.CryptoCoin.logo}`}></img>
            <div className="flex flex-col gap-y-1">
              <p>{item.coin_name}</p>
              <p>{item.jumlah_coin}</p>
            </div>
          </li>
        </ul>
        <ul>
          <li className="font-bold text-lg">Total Pembayaran</li>
          <li className="flex gap-x-2 mt-1">
            <p>{formatCurrencyToIDR(item.total_pembayaran)}</p>
          </li>
        </ul>
        <ul>
          <li className="font-bold text-lg text-end">Status</li>
          <li className="flex gap-x-2 mt-1">
            {item.status === "Paid" && (
            <p className="py-1 px-2 bg-Buy/85 rounded-md">{item.status}</p>)}
            {item.status === "pending" && (
            <p className="py-1 px-2 bg-BtnBg/85 text-TextOnYellow rounded-md">Waiting for Payment</p>)}
            {item.status === "expired" && (
            <p className="py-1 px-2 bg-Error/85 rounded-md">{item.status}</p>)}
          </li>
        </ul>
      </div>
      <hr className="mt-2 border-t border-InputLine" />

      <div className="flex flex-col mt-3 gap-y-1">
        <ul className="flex flex-row justify-between">
          <li>Transaction Date</li>
          <li>{formateDate(item.createdAt)}</li>
        </ul>
        <ul className="flex flex-row justify-between">
          <li>Wallet Address</li>
          <li>{item.reciever_wallet_address}</li>
        </ul>
      </div>
      {item.status === "pending" && (
        <div className="flex justify mt-3">
          <div>
            <PrimaryButton label="Bayar" onClick={()=>navigage(`/bayar?uuid=${item.uuid}`)} className="w-fit h-fit" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryCard;
