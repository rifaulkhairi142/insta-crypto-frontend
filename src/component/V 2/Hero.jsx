import React, { useEffect, useState } from "react";
import { TrendingUp, ArrowRight, Shield } from "lucide-react";
import HeroSkeleton from "./UI/HeroSkeleton";
import axios from "axios";
import config from "../../config/config";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    getCryptoCoins();
  }, []);

  useEffect(() => {
    if (coins.length === 0) return;

    const socket = new WebSocket("wss://ws3.indodax.com/ws/");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          id: 1,
          params: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo",
          },
        })
      );

      setTimeout(() => {
        socket.send(
          JSON.stringify({
            method: 1,
            params: {
              channel: "market:summary-24h",
            },
            id: 2,
          })
        );
      }, 1000);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (
        data?.result?.channel === "market:summary-24h" &&
        Array.isArray(data.result.data?.data)
      ) {
        const marketData = data.result.data.data;
        const updated = {};

        coins.forEach((coin) => {
          const code = coin.CryptoCoin.wss_indodax_price_code;
          const match = marketData.find((item) => item[0] === code);

          if (match) {
            updated[code] = {
              close: match[5],
              change: calculateChange(match[2], match[5]), // open vs close
              positive: match[5] > match[2],
            };
          }
        });

        setPrices((prev) => ({ ...prev, ...updated }));
      }
    };

    return () => socket.close();
  }, [coins]);

  const calculateChange = (open, close) => {
    if (!open || !close) return "0.00%";
    const change = ((close - open) / open) * 100;
    return `${change.toFixed(2)}%`;
  };

  const getCryptoCoins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.base_url}/customer/cryptocoins`);
      const filtered = res.data.data.filter(
        (coin) => coin.CryptoCoin?.wss_indodax_price_code
      );
      setCoins(filtered);
    } catch (err) {
      console.error("Failed to fetch coins:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("prices : ", prices);
  }, [prices]);

  if (loading) return <HeroSkeleton />;

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23374151%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-blue-400 font-medium">
                Dipercaya oleh 1000+ pengguna indonesia
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Beli Crypto Instan & Aman dalam
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {" "}
                Hitungan Detik
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Mulai perjalanan investasi kamu tanpa ribet. Pilih koin, tentukan
              jumlah uang, dan bayar langsung lewat QRIS — cepat dan praktis!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Mulai Transaksi</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>View Markets</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">300+</div>
                <div className="text-gray-400 text-sm">Cryptocurrencies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white ">$2.1B</div>
                <div className="text-gray-400 text-sm">24h Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2M+</div>
                <div className="text-gray-400 text-sm">Active Users</div>
              </div>
            </div>
          </div>

          {/* Right Content - Real-time Crypto Cards */}
          <div className="relative">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Live Prices
                </h3>
                <div className="flex items-center space-x-1 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                {coins.map((coin) => {
                  const code = coin.CryptoCoin.wss_indodax_price_code;
                  const price = prices[code];

                  return (
                    <div
                      key={coin.uuid}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-gray-900 font-bold text-sm">
                            {coin.CryptoCoin.kode.toUpperCase().slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {coin.CryptoCoin.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {coin.CryptoCoin.kode.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">
                          {price
                            ? `Rp ${Number(price.close).toLocaleString()}`
                            : coin?.CryptoCoin?.price
                            ? `Rp ${Number(
                                coin.CryptoCoin.price
                              ).toLocaleString()}`
                            : "Loading..."}
                        </div>
                        <div
                          className={`text-sm ${
                            price?.positive ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {price ? price.change : "-"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-200 transform hover:scale-105">
                View All Markets
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
