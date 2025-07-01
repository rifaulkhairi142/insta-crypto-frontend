import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  QrCode,
  CreditCard,
  Smartphone,
} from "lucide-react";
import Header from "../../component/V 2/Header";
import axios from "axios";
import config from "../../config/config";
import { formatDateOp2 } from "../../Utils/DateConverter";
import { formatCurrencyToIDR } from "../../Utils/IDRFormater";
import PaymentDetailSkeleton from "../../component/V 2/UI/PaymentDetailSkeleton";



const PaymentDetailPage = () => {
  const { id } = useParams();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isExpired, setIsExpired] = useState(true);
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState(null);
 

  useEffect(() => {
    if (!transaction?.expiry_time) return;

    const expiryTime = new Date(transaction?.expiry_time).getTime();

    const calculateTimeRemaining = () => {
      const now = Date.now();
      const diff = expiryTime - now;

      if (diff <= 0) {
        setIsExpired(true);
        setTimeRemaining(0);
      } else {
        setIsExpired(false);
        setTimeRemaining(diff);
      }
    };

    calculateTimeRemaining();

    const timer = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(timer);
  }, [transaction]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-6 w-6 text-green-400" />;
      case "pending":
        return <Clock className="h-6 w-6 text-yellow-400" />;
      case "expired":
        return <AlertTriangle className="h-6 w-6 text-red-400" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "expired":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case "qris":
        return <QrCode className="h-5 w-5" />;
      case "bank transfer":
        return <CreditCard className="h-5 w-5" />;
      case "e-wallet":
        return <Smartphone className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const formatTimeRemaining = (milliseconds) => {
    if (milliseconds <= 0)
      return { display: "Expired", minutes: 0, seconds: 0 };

    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {
      display: `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`,
      minutes,
      seconds,
    };
  };

  const getTimerColor = () => {
    const totalMinutes = Math.floor(timeRemaining / (1000 * 60));
    if (isExpired) return "text-red-400 bg-red-400/10 border-red-400/20";
    if (totalMinutes <= 2)
      return "text-red-400 bg-red-400/10 border-red-400/20";
    if (totalMinutes <= 5)
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-green-400 bg-green-400/10 border-green-400/20";
  };

  const getProgressPercentage = () => {
    const totalTime = 15 * 60 * 1000; // 15 minutes in milliseconds
    const percentage = Math.max(0, (timeRemaining / totalTime) * 100);
    return percentage;
  };

  const timeData = formatTimeRemaining(timeRemaining);

  const getTransactinDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.base_url}/transaction/${id}`);
      console.log("Transaction : ", response.data);
      setTransaction(response.data.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactinDetail();
  }, []);

  if(loading) return <PaymentDetailSkeleton/>;

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/transaction-history"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Riwayat Transaksi</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Detail Pembayaran
              </h1>
              <p className="text-gray-300">ID Transaksi: {transaction?.id}</p>
            </div>

            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${getStatusColor(
                transaction?.status
              )}`}
            >
              {getStatusIcon(transaction?.status)}
              <span className="font-semibold">
                {transaction?.status === "paid" && "Selesai"}
                {transaction?.status === "pending" && "Menunggu Pembayaran"}
                {transaction?.status === "expired" && "Kadaluarsa"}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Expiration Timer - Prominent Display */}
        {transaction?.status === "pending" && (
          <div
            className={`mb-8 rounded-2xl p-6 border-2 ${getTimerColor()} transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Clock className="h-8 w-8" />
                  {!isExpired && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-current rounded-full animate-pulse"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {isExpired
                      ? "Pembayaran Kedaluwarsa"
                      : "Waktu Pembayaran Tersisa"}
                  </h3>
                  <p className="text-sm opacity-80">
                    {isExpired
                      ? "Silakan buat transaksi baru"
                      : "Selesaikan pembayaran sebelum waktu habis"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-4xl font-bold font-mono">
                  {timeData.display}
                </div>
                {!isExpired && (
                  <div className="text-sm opacity-80">
                    {timeData.minutes} menit {timeData.seconds} detik
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {!isExpired && (
              <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-current transition-all duration-1000 ease-linear"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            )}

            {isExpired && (
              <div className="mt-4 flex space-x-3">
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-200">
                  Buat Transaksi Baru
                </button>
                <button className="border border-current px-6 py-3 rounded-lg font-semibold hover:bg-current hover:bg-opacity-10 transition-all duration-200">
                  Hubungi Support
                </button>
              </div>
            )}
          </div>
        )}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Transaction Details */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">
                Informasi Transaksi
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Tipe Transaksi
                    </label>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-400/10 text-green-400`}
                      >
                        Pembelian
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Cryptocurrency
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-gray-900 font-bold text-sm">
                          {transaction?.CryptoCoinNetwork?.CryptoCoin?.kode.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          {transaction?.CryptoCoinNetwork?.CryptoCoin?.kode.toUpperCase()}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {transaction?.CryptoCoinNetwork?.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Jumlah
                    </label>
                    <div className="text-white font-semibold">
                      {transaction?.coin_amount}{" "}
                      {transaction?.CryptoCoinNetwork?.CryptoCoin?.kode.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Metode Pembayaran
                    </label>
                    <div className="flex items-center space-x-2">
                      {getPaymentMethodIcon("QRIS")}
                      <span className="text-white font-semibold">QRIS</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Tanggal Dibuat
                    </label>
                    <div className="text-white">
                      {formatDateOp2(transaction?.createdAt)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Tenggat Pembayaran
                    </label>
                    <div className="text-white">
                      {formatDateOp2(transaction?.expiry_time)}
                    </div>
                  </div>

                  {transaction?.status === "paid" && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Tanggal Selesai
                      </label>
                      <div className="text-white">
                        {transaction.status === "paid"
                          ? formatDateOp2(transaction?.updatedAt)
                          : "-"}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Alamat Wallet
                    </label>
                    <div className="flex items-center space-x-2">
                      <code className="text-white bg-gray-700/50 px-2 py-1 rounded text-sm font-mono">
                        {transaction?.reciever_wallet_address.slice(0, 20)}...
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(transaction?.reciever_wallet_address)
                        }
                        className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QRIS Payment Information */}
            {transaction?.status === "pending" &&
              transaction?.Bank?.name === "gopay" &&
              !isExpired && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Pembayaran QRIS
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* QR Code */}
                    <div className="text-center">
                      <div className="bg-white p-6 rounded-2xl inline-block mb-4 shadow-lg">
                        <img src={`${transaction?.qris_link}`} />
                      </div>

                      {/* Mini Timer */}
                      <div
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${getTimerColor()}`}
                      >
                        <Clock className="h-4 w-4" />
                        <span className="font-medium text-sm">
                          {timeData.display}
                        </span>
                      </div>

                      <p className="text-gray-300 text-sm mt-3">
                        Scan QR Code dengan aplikasi mobile banking atau
                        e-wallet Anda
                      </p>
                    </div>

                    {/* Payment Instructions */}
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <QrCode className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-blue-300 font-medium mb-2">
                              Cara Pembayaran QRIS:
                            </p>
                            <ol className="text-blue-200 text-sm space-y-1 list-decimal list-inside">
                              <li>
                                Buka aplikasi mobile banking atau e-wallet
                              </li>
                              <li>Pilih menu "Scan QR" atau "QRIS"</li>
                              <li>Arahkan kamera ke QR Code di atas</li>
                              <li>
                                Pastikan nominal sesuai dengan total pembayaran
                              </li>
                              <li>Konfirmasi pembayaran</li>
                              <li>Simpan bukti pembayaran</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div className="space-y-3">

                        <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                          <span className="text-gray-400">
                            Jumlah Pembayaran
                          </span>
                          <span className="text-yellow-400 font-bold">
                            {formatCurrencyToIDR(transaction?.total_pembayaran)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Expired Payment Notice */}
            {transaction?.status === "pending" && isExpired && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-2">
                  Pembayaran Kedaluwarsa
                </h3>
                <p className="text-red-300 mb-6">
                  Waktu pembayaran telah habis. Silakan buat transaksi baru
                  untuk melanjutkan pembelian cryptocurrency.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-200">
                    Buat Transaksi Baru
                  </button>
                  <button className="border border-red-400 text-red-400 px-6 py-3 rounded-lg font-semibold hover:bg-red-400/10 transition-all duration-200">
                    Hubungi Support
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Ringkasan Pembayaran
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white font-medium">
                    {formatCurrencyToIDR(
                      transaction?.total_pembayaran -
                        calculateAdminFee(transaction)
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Biaya Admin</span>
                  <span className="text-white font-medium">
                    {formatCurrencyToIDR(calculateAdminFee(transaction))}
                  </span>
                </div>

                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">
                      Total Pembayaran
                    </span>
                    <span className="text-yellow-400 font-bold text-lg">
                      {formatCurrencyToIDR(transaction?.total_pembayaran)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-3 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 flex items-center justify-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download Invoice</span>
              </button>

              <button className="w-full border border-gray-600 text-white py-3 rounded-lg font-semibold hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200">
                Hubungi Support
              </button>
            </div>

            {/* Help */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-300 font-medium mb-1">
                    Butuh Bantuan?
                  </p>
                  <p className="text-blue-200 text-sm mb-3">
                    Tim support kami siap membantu 24/7
                  </p>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    Chat dengan Support →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailPage;

const calculateAdminFee = (transaction) => {
  let network_fee = transaction?.CryptoCoinNetwork.admin_fee;
  let coin_fee = transaction?.CryptoCoinNetwork.CryptoCoin.admin_fee;
  let bank_fee = transaction?.Bank.admin_fee_percentage;

  let total_fee_pertcent =
    parseFloat(network_fee) + parseFloat(coin_fee) + parseFloat(bank_fee);

  let adminFee =
    parseFloat(transaction?.total_pembayaran) * (total_fee_pertcent / 100);

  return Math.ceil(adminFee);
};
