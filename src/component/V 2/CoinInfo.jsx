import React, { useEffect, useState } from "react";
import { ChevronDown, Info, Calculator, ArrowUpDown } from "lucide-react";
import DropdownCrypto from "../../component/DropdownCrypto";
import InputCurrency from "../../component/InputCurrency";
import NormalInput from "../../component/NormalInput";
import Input from "../Input";
import CoinInfoSkeleton from "../../component/V 2/UI/CoinInfoSkeleton";
import config from "../../config/config";
import axios from "axios";
import { formatCurrencyToIDR } from "../../Utils/IDRFormater.js";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoadingOnButton from "../V 2/LoadingOnButton.jsx";
import { toast, ToastContainer } from "react-toastify";

const CoinInfo = () => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("qris");
  const [loading, setLoading] = useState(true);
  const [createTransactionLoading, setCreateTransactionLoading] =
    useState(false);
  const [cryptoData, setCryptoData] = useState(null);
  const [avalibalePaymentMethod, setAvailablePaymentMethod] = useState(null);
  const [coin, setCoin] = useState(null);
  const [biayaAdmin, setBiayaAdmin] = useState(null);
  const [totalPembayaran, setTotalPembayaran] = useState(null);
  const [jumlah, setJumlah] = useState(0);
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const showMessage = (msg, status) => {
    if (status === "error") {
      toast.error(msg, {
        autoClose: 2000,
        position: "top-right",
        theme: "dark",
      });
    } else if (status === "success") {
      toast.success(msg, {
        autoClose: 2000,
        position: "top-right",
        theme: "dark",
      });
    }
  };

  const onCoinChange = (e) => {
    setCoin(e);
    console.log(e);
  };

  useEffect(() => {
    getCryptoCoin();
  }, []);

  const onAmountChange = (e) => {
    setAmount(e);
  };

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
      getAvailablePaymentMethod();
    }
  };
  useEffect(() => {
    let price = parseFloat(coin?.CryptoCoin?.price) || 0;
    let amountNumber = parseFloat(amount) || 0;

    let total = amountNumber / price;
    setJumlah(total || 0);
    console.log("amount : ", amount);

    let adminFee = Math.ceil(
      calculateAdminFee(amountNumber, coin, selectedPaymentMethod)
    );
    console.log("admin fee : ", adminFee);
    setBiayaAdmin(adminFee);
    setTotalPembayaran(adminFee + amountNumber);
  }, [coin, amount, selectedPaymentMethod]);

  useEffect(() => {
    console.log(selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  const createTransaction = async () => {
    if (user) {
      try {
        setCreateTransactionLoading(true);

        const response = await axios.post(
          `${config.base_url}/transaction`,
          {
            email_user: user?.email,
            coin_network_id: coin?.id,
            total_pembayaran: totalPembayaran,
            payment_type_id: selectedPaymentMethod.id,
            reciever_wallet_address: walletAddress,
            coin_amount: jumlah,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        showMessage(response?.data?.msg, "success");
        setTimeout(()=>{
          navigate(`/payment-detail/${response.data.data.transaction.uuid}`);

        }, 2500);
      } catch (error) {
        setCreateTransactionLoading(false);
        showMessage(error?.response?.data?.msg, "error");
      } finally {
        setCreateTransactionLoading(false);
        
      }
    }else{
      showMessage("Mohon login terlebih dahulu", "error");
      setTimeout(()=>navigate("/login", 2500));
    }
  };

  const getAvailablePaymentMethod = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.base_url}/banks`);

      const modifiedMethods = response.data.data.map((method) => {
        if (method.name === "gopay") {
          return {
            ...method,
            name: "QRIS",
            logo: "QRIS",
          };
        }
        return method;
      });

      setAvailablePaymentMethod(modifiedMethods);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (avalibalePaymentMethod && avalibalePaymentMethod.length > 0) {
      const gopayMethod = avalibalePaymentMethod.find(
        (pym) => pym.name === "QRIS"
      );
      if (gopayMethod) {
        setSelectedPaymentMethod(gopayMethod);
      }
    }
  }, [avalibalePaymentMethod]);

  if (loading) return <CoinInfoSkeleton />;

  return (
    <section className="py-20 bg-gray-900">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-gray-900" />
              </div>
              <span>Informasi Koin</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Form */}
              <div className="space-y-6">
                {/* Coin Selection */}

                <DropdownCrypto
                  label="Coin"
                  options={cryptoData?.data}
                  onChange={(e) => onCoinChange(e)}
                />
                <InputCurrency
                  label="Jumlah"
                  onChange={(e) => onAmountChange(e)}
                  value={amount}
                />
                <Input
                  label="Wallet Address"
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>

              {/* Right Column - Summary */}
              <div className="space-y-6">
                {/* Exchange Summary */}
                <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Ringkasan Exchange
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Coin</span>
                      <span className="text-white font-medium">
                        {coin?.name || "-"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Jumlah</span>
                      <span className="text-white font-medium">
                        {jumlah || "0"}
                      </span>
                    </div>

                    <div className="border-t border-gray-600 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Biaya Admin</span>
                        <span className="text-white font-medium">
                          {formatCurrencyToIDR(biayaAdmin)}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-600 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-semibold">
                          Total Pembayaran
                        </span>
                        <span className="text-white font-bold">
                          {formatCurrencyToIDR(totalPembayaran)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rate Info */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-blue-300 text-sm">
                        Rate akan dikunci selama 15 menit setelah konfirmasi
                        pembayaran
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Metode Pembayaran
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {avalibalePaymentMethod?.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedPaymentMethod.id === method.id
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-gray-600 bg-gray-700/30 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm ${
                          selectedPaymentMethod.id === method.id
                            ? "bg-yellow-400 text-gray-900"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {method.logo}
                      </div>
                      <span className="text-white text-sm font-medium">
                        {method.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Exchange Button */}
            <div className="mt-8">
              <button
                onClick={createTransaction}
                disabled={!coin || !amount || !walletAddress}
                className="w-full relative bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-4 rounded-lg font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {createTransactionLoading ? (
                  <LoadingOnButton />
                ) : (
                  <>
                    <ArrowUpDown className="h-5 w-5" />
                    <span>Exchange Now</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-700/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
              <div className="text-center p-4 bg-gray-700/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">0.1%</div>
                <div className="text-gray-400 text-sm">Trading Fee</div>
              </div>
              <div className="text-center p-4 bg-gray-700/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">300+</div>
                <div className="text-gray-400 text-sm">Coins</div>
              </div>
              <div className="text-center p-4 bg-gray-700/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">
                  Instant
                </div>
                <div className="text-gray-400 text-sm">Processing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinInfo;
const calculateAdminFee = (cryptoPrice, coinsData = {}, paymentMethod = {}) => {
  let networkCoinFee = parseFloat(coinsData?.admin_fee) || 0;
  let coinCryptoFee = parseFloat(coinsData?.CryptoCoin?.admin_fee) || 0;
  let paymentMethodFee = parseFloat(paymentMethod?.admin_fee_percentage) || 0;

  let adminFee =
    (cryptoPrice) * ((paymentMethodFee + networkCoinFee + coinCryptoFee) / 100);

  return adminFee;
};
