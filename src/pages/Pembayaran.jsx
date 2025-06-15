import GuestLayout from "../layout/GuestLayout";
import { getMe } from "../features/authSlice";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../config/config.js';




const Pembayaran = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get('uuid');
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    dispatch(getMe);
  },[dispatch]);

  useEffect(()=>{
    if(isError){
      navigate("/login");
    }
    getTransactions();

  }, []);

  const getTransactions = async () => {

    try {
      setLoading(true);
      const response = await axios.get(`${config.base_url}/transaction/${uuid}`);
      setTransaction(response.data.data);

    } catch (error) {
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };
  return (
    <GuestLayout>
      <div className="flex flex-col gap-y-4">
        <div className="text-textWhite flex flex-row items-center  gap-x-1 font-binance-plex font-bold text-2xl">
          <span>Pembayaran |</span>
          <div className="flex flex-row gap-x-2">
            <NavLink
              to="/transactions"
              className="text-[18px] font-normal hover:text-BtnBg"
            >
              Transactions
            </NavLink>
            <NavLink className="text-[18px] font-normal text-BtnBg">
              Payment
            </NavLink>
          </div>
        </div>
        <hr className="border border-InputLine" />
        <section className="text-textWhite flex flex-row gap-y-3 font-binance-plex">
          <div className="flex w-full">
            <ul className="flex  gap-x-3">
              <li>
                <img className="w-14 h-14" src={`${config.base_url}/${transaction?.CryptoCoinNetwork.CryptoCoin.logo}`}></img>
              </li>
              <li className="text-2xl font-bold">{transaction?.CryptoCoinNetwork.CryptoCoin.name}</li>
            </ul>
          </div>
          <div className="rounded-2xl p-2  bg-white w-fit justify-center items-center flex flex-col">
            <img src="/Logo_QRIS.svg" className="w-30" />
            <img
              className="w-[300px]"
              src={`${transaction?.qris_link}`}
            />
          </div>
        </section>
      </div>
    </GuestLayout>
  );
};

export default Pembayaran;
