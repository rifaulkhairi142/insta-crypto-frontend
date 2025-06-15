import GuestLayout from "../layout/GuestLayout";

import { getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TransactionHistoryCard from "../component/TransactionHistoryCard.jsx";
import { useEffect, useState } from "react";
import config from '../config/config.js';
import axios from "axios";
import Loader from '../component/Loader.jsx';

// const transactions = [
//   {
//     logo: "/Etherium.png",
//     coin_name: "Etherium",
//     id: 1,
//     total_pembayaran: 20000,
//     jumlah_coin: 0.002,
//     wallet_address: "0xc7EE9CBA2C8086b72Cc9b36a5af280522427c4F0",
//     transaction_date: "20:22 25 Juny 2025",
//     status: "Paid",
//   },
//   {
//     logo: "/Etherium.png",
//     coin_name: "Etherium",
//     id: 1,
//     total_pembayaran: 20000,
//     jumlah_coin: 0.002,
//     wallet_address: "0xc7EE9CBA2C8086b72Cc9b36a5af280522427c4F0",
//     transaction_date: "20:22 25 Juny 2025",
//     status: "Waiting for Payment",
//   },
//   {
//     logo: "/Etherium.png",
//     coin_name: "Etherium",
//     id: 1,
//     total_pembayaran: 20000,
//     jumlah_coin: 0.002,
//     wallet_address: "0xc7EE9CBA2C8086b72Cc9b36a5af280522427c4F0",
//     transaction_date: "20:22 25 Juny 2025",
//     status: "expired",
//   },
// ];

const RiwayatTransaksi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state)=>state.auth);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(()=> {
    getMyTransactions();
    if(isError){
      navigate("/login");
    }

  }, []);

  const getMyTransactions = async()=> {
    try{
      const response = await axios.get(`${config.base_url}/my-transactions`);

      setTransactions(response?.data?.data)
      

    }catch(error){
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }

  return (
    <GuestLayout>
      <div className="flex flex-col gap-y-4">
        <div className="text-textWhite font-binance-plex font-bold text-2xl">
          Riwayat Transaksi
        </div>
        <hr className="border border-InputLine" />
        <section className="text-textWhite flex flex-col gap-y-3 font-binance-plex">
          {transactions?.map((item) => (
            <TransactionHistoryCard item={item} />
          ))}
        </section>
      </div>
    </GuestLayout>
  );
};

export default RiwayatTransaksi;
