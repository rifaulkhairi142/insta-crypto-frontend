import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Loader from "../component/Loader";
import InputCurrency from "./InputCurrency";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import DropdownCrypto from "./DropdownCrypto";
import { FaCaretDown } from "react-icons/fa";
import config from "../config/config.js";
import { formatCurrencyToIDR } from "../Utils/IDRFormater.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const TopUp = () => {
  const [cryptoPrice, setCryptoPrice] = useState(null);

  const [amount, setAmount] = useState(null);
  const [coin, setCoin] = useState(null);
  const [biayaAdmin, setBiayaAdmin] = useState(null);
  const [totalPembayaran, setTotalPembayaran] = useState(null);
  const [jumlah, setJumlah] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState(null);
  const [avalibalePaymentMethod, setAvailablePaymentMethod] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);
  const [recieverWalletAddress, setRecieverWalletAddress] = useState(null);

  const onCoinChange = (e) => {
    setCoin(e);
    console.log(e);
  };

  useEffect(() => {
    let price = coin?.CryptoCoin.price;
    let total = amount / price;
    if (total !== "NaN") {
      setJumlah(total || 0);
    }

    let adminFee = calculateAdminFee(amount, coin, selectedPaymentMethod);
    setBiayaAdmin(adminFee);
    setTotalPembayaran(
      calculateAdminFee(amount, coin, selectedPaymentMethod) + amount
    );
    console.log("admin fee :", adminFee);
    // console.log("total : ", total, " amount : ", amount, " Price :", total);
  }, [coin, amount, selectedPaymentMethod]);

  const onAmountChange = (e) => {
    setAmount(e);
  };

  useEffect(() => {
    console.log("user : ", user);
  }, [user]);

  const getCryptoCoin = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.base_url}/customer/cryptocoins`
      );

      setCryptoData(response.data);

      console.log("response : ", response);
    } catch (error) {
      setLoading(false);
      console.log("error getting crypto coin data : ", error);
    } finally {
      // setLoading(false);
      getAvailablePaymentMethod();
    }
  };

  const createTransaction = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${config.base_url}/transaction`,
        {
          email_user: user?.email,
          coin_network_id: coin?.id,
          total_pembayaran: totalPembayaran,
          payment_type_id: selectedPaymentMethod.id,
          reciever_wallet_address: recieverWalletAddress,
          coin_amount: jumlah,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigate("/transactions")
    }
  };

  const getAvailablePaymentMethod = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.base_url}/banks`);
      setAvailablePaymentMethod(response.data.data);
      setSelectedPaymentMethod(
        response.data.data.find((pym) => (pym.name = "gopay"))
      );
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getCryptoTicker();
    getCryptoCoin();
  }, []);
  return (
    <div className="flex relative w-full flex-col gap-y-8 ring-1 rounded-lg ring-bg4 h-fit p-4">
      {loading && <Loader className="bg-BasicBg/55 z-[99999] m-2" />}
      <div className="flex flex-col gap-y-2">
        <h2 className="font-binance-plex text-2xl text-white font-bold">
          Informasi Koin
        </h2>
        <div className="flex w-full flex-col gap-y-2">
          <DropdownCrypto
            options={cryptoData?.data}
            onChange={(e) => onCoinChange(e)}
            label="Coin"
          />
          <InputCurrency
            value={amount}
            label="Jumlah"
            onChange={(e) => onAmountChange(e)}
          />
          <Input
            label="Wallet Address"
            onChange={(e) => setRecieverWalletAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <ul className=" grid grid-cols-2 gap-3 text-xl justify-end w-full text-white ">
            <li>
              <div>Coin</div>
              <div className="text-textSecondary">{coin?.name || "-"}</div>
            </li>
            <li>
              <div className="font-bold">Jumlah</div>
              <div className="text-textSecondary">{jumlah}</div>
            </li>
            <li>
              <div>Biaya Admin</div>
              <div className="text-textSecondary">
                {formatCurrencyToIDR(biayaAdmin) || 0}
              </div>
            </li>
            <li>
              <div>Total Pembayaran</div>
              <div className="text-textSecondary">{totalPembayaran}</div>
            </li>
          </ul>
        </div>
        <hr className="border-InputLine" />
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-binance-plex text-2xl text-white font-bold">
          Metode Pembayaran
        </h2>

        <div className="flex flex-col gap-y-2 p-2 rounded-lg border border-textBrand w-fit cursor-pointer">
          <div className="flex p-3 gap-3 items-center">
            <div
              className="w-25 h-20 bg-white mask mask-image"
              style={{
                WebkitMask: `url('/Logo_QRIS.svg') no-repeat center`,
                WebkitMaskSize: "contain",
                mask: `url('/Logo_QRIS.svg') no-repeat center`,
                maskSize: "contain",
              }}
            ></div>
          </div>
        </div>

        <hr className="border-InputLine" />
      </div>
      <div>
        <PrimaryButton
          label="Exchange Now"
          onClick={() => createTransaction()}
        />
      </div>
    </div>
  );
};

export default TopUp;

const findCrptoPrice = (kode, ticker = {}) => {
  if (kode) {
    return ticker[kode]?.last;
  }
};

const calculateAdminFee = (cryptoPrice, coinsData = {}, paymentMethod = {}) => {
  let networkCoinFee = parseFloat(coinsData?.admin_fee) || 0;
  let coinCryptoFee = parseFloat(coinsData?.CryptoCoin?.admin_fee) || 0;
  let paymentMethodFee = parseFloat(paymentMethod?.admin_fee_percentage) || 0;

  console.log("Coin data : ", coinsData);
  console.log("payment method : ", paymentMethod);
  console.log(
    "netwowrk fee : ",
    networkCoinFee,
    " coinCryptoFee : ",
    coinCryptoFee,
    " paymentMethodFee : ",
    paymentMethodFee
  );

  let adminFee =
    (cryptoPrice + networkCoinFee + coinCryptoFee) * (paymentMethodFee / 100);
  // let adminFee = (networkCoinFee + coinCryptoFee);

  return adminFee + coinCryptoFee + networkCoinFee;
};
