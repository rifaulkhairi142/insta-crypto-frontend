import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Header from "../../component/V 2/Header";
import axios from "axios";
import config from "../../config/config";
import TransactionHistorySkeleton from "../../component/V 2/UI/TransactionHIstorySkeleton";
import { formateDate } from "../../Utils/DateConverter";
import { formatCurrencyToIDR } from "../../Utils/IDRFormater";

const TransactionHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const {
    totalTransaksi,
    totalVolume,
    transaksiBerhasil,
    tingkatKeberhasilan,
  } = useMemo(() => {
    const total = transactions.length;
    const volume = transactions.reduce((sum, tx) => {
      return sum + parseFloat(tx.total_pembayaran || 0);
    }, 0);
    const berhasil = transactions.filter((tx) => tx.status === "paid").length;
    const tingkat = total > 0 ? ((berhasil / total) * 100).toFixed(0) : 0;

    return {
      totalTransaksi: total,
      totalVolume: volume,
      transaksiBerhasil: berhasil,
      tingkatKeberhasilan: tingkat,
    };
  }, [transactions]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-400" />;
      // case "processing":
      //   return <AlertCircle className="h-5 w-5 text-blue-400" />;
      case "expired":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-400 bg-green-400/10";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10";
      // case "processing":
      //   return "text-blue-400 bg-blue-400/10";
      case "expired":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.CryptoCoinNetwork.CryptoCoin.kode
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || tx.status === filterStatus;
    const matchesType = filterType === "all" || tx.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getMyTransactions = async () => {
    try {
      const response = await axios.get(`${config.base_url}/my-transactions`);
      setTransactions(response.data.data);

      console.log("my transaction : ", response.data);
    } catch (error) {
      console.log("transaction : ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyTransactions();
  }, []);

  if (loading) {
    return <TransactionHistorySkeleton />;
  }

  

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">
            Riwayat Transaksi
          </h1>
          <p className="text-gray-300">
            Kelola dan pantau semua transaksi cryptocurrency Anda
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="completed">Selesai</option>
              <option value="pending">Menunggu</option>
              <option value="processing">Diproses</option>
              <option value="failed">Gagal</option>
            </select>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">Semua Tipe</option>
              <option value="buy">Beli</option>
              <option value="sell">Jual</option>
            </select>

            {/* Export Button */}
            <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-200">
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    ID Transaksi
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Tipe
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Coin
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Jumlah
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Total Pembayaran
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.uuid}
                    className="hover:bg-gray-700/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">
                        {transaction.uuid}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === "buy"
                            ? "bg-green-400/10 text-red-400"
                            : "bg-red-400/10 text-green-400"
                        }`}
                      >
                        {transaction.type === "buy" ? "Jual" : "beli"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-gray-900 font-bold text-xs">
                            {transaction.CryptoCoinNetwork.CryptoCoin.kode.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white font-medium">
                          {transaction.coin}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {transaction.coin_amount}
                    </td>

                    <td className="px-6 py-4 text-white font-semibold">
                      {formatCurrencyToIDR(transaction.total_pembayaran)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status === "paid" && "Selesai"}
                          {transaction.status === "pending" && "Menunggu"}
                          {transaction.status === "expired" && "Gagal"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {formateDate(transaction.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/payment-detail/${transaction.uuid}`}
                        className="inline-flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">Detail</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                Tidak ada transaksi ditemukan
              </div>
              <p className="text-gray-500 text-sm">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-green-400 mb-2">
              {totalTransaksi}
            </div>
            <div className="text-gray-300 text-sm">Total Transaksi</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-blue-400 mb-2">
              {formatCurrencyToIDR(totalVolume)}
            </div>
            <div className="text-gray-300 text-sm">Total Volume</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              {transaksiBerhasil}
            </div>
            <div className="text-gray-300 text-sm">Transaksi Berhasil</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-purple-400 mb-2">
              {tingkatKeberhasilan}%
            </div>
            <div className="text-gray-300 text-sm">Tingkat Keberhasilan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
