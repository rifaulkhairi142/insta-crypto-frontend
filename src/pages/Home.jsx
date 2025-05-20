import React, { useEffect, useState } from "react";
import GuestLayout from "../layout/GuestLayout";
import { TrendingDown, TrendingUp } from "lucide-react";
import TopUp from "../component/TopUp";
import btcicon from "../../public/Bitcoin.png";
import ethicon from "../../public/Etherium.png";
import solicon from "../../public/Solana.png";
import xrpicon from "../../public/xrp.png";

const cryptoList = [
  { icon: btcicon, name: "BTC", code:"btcidr"},
  { icon: ethicon, name: "ETH", code:'ethidr'},
  { icon: solicon, name: "SOL", code:'solidr'},
  { icon: xrpicon, name: "XRP", code:'xrpidr'},
];

const Home = () => {
  const [prices, setPrices] = useState({
    BTC: null,
    ETH: null,
    SOL: null,
    XRP: null,
  });

  // const [criptoList, setCryptoList] = useState([
  //   { icon: btcicon, name: "BTC", code: "btcidr" },
  //   { icon: ethicon, name: "ETH", code: "ethidr" },
  //   { icon: solicon, name: "SOL", code: "solidr" },
  //   { icon: xrpicon, name: "XRP", code: "xrpidr" },
  // ]);

  const [previousPrices, setPreviousPrices] = useState({
    BTC: null,
    ETH: null,
    SOL: null,
    XRP: null,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const streams = [
      "btcusdt@markPrice",
      "ethusdt@markPrice",
      "solusdt@markPrice",
      "xrpusdt@markPrice",
    ];
    const url = `wss://fstream.binance.com/stream?streams=${streams.join("/")}`;
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const symbol = message.data.s; // e.g., BTCUSDT
        const newPrice = parseFloat(message.data.p); // price in USD
        const coin = symbol.replace("USDT", "");

        setPrices((prev) => ({
          ...prev,
          [coin]: newPrice,
        }));

        setPreviousPrices((prev) => ({
          ...prev,
          [coin]: prices[coin],
        }));
      } catch (err) {
        console.error("WebSocket parse error:", err);
        setError("Failed to parse WebSocket data.");
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("WebSocket connection error.");
    };

    return () => socket.close();
  }, [prices]);

  const getPercentChange = (current, previous) => {
    if (previous === null || current === null) return null;
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(2);
  };

  // useEffect(() => {
  //   const socketIndodax = new WebSocket("wss://ws3.indodax.com/ws/");

  //   socketIndodax.onopen = () => {
  //     console.log("WebSocket connected");

  //     // Step 1: Send auth message
  //     socketIndodax.send(
  //       JSON.stringify({
  //         id: 1,
  //         params: {
  //           token:
  //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo",
  //         },
  //       })
  //     );

  //     // Step 2: Subscribe to BTC/IDR ticker after a short delay
  //     setTimeout(() => {
  //       socketIndodax.send(
  //         JSON.stringify({
  //           method: 1,
  //           params: {
  //             channel: "market:summary-24h",
  //           },
  //           id: 2,
  //         })
  //       );
  //     }, 1000); // delay to ensure auth is processed first
  //   };

  //   let price = 0;

  //   socketIndodax.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     price = data['']
  //     cryptoList.map((itm)=>{
        
  //     })
  //   };

  //   socketIndodax.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   socketIndodax.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   return () => {
  //     socketIndodax.close();
  //     console.log("WebSocket cleaned up");
  //   };
  // }, []);

  return (
    <GuestLayout>
      <div className="flex flex-col gap-y-8">
        <span className="text-4xl font-bold text-center text-textWhite">Indonesia Instant Crypto Currency Exchange</span>
        <div className="h-[1000px] gap-3 font-binance-plex flex w-full flex-col md:flex-row">
          <div className="flex flex-col w-full gap-3 h-fit text-white ">
            <div className="flex flex-col gap-y-3 p-3 rounded-2xl ring-1 ring-InputLine w-full">
              <span className="font-normal text-sm ">HOT CRYPTO</span>

              <div className="flex flex-col gap-y-1" id="Table">
                {cryptoList.map((coin) => {
                  const price = prices[coin.name];
                  const prev = previousPrices[coin.name];
                  const percent = getPercentChange(price, prev);
                  const colorClass =
                    percent >= 0
                      ? "text-green-500"
                      : percent < 0
                      ? "text-red-500"
                      : "text-gray-300";

                  return (
                    <ul
                      key={coin.name}
                      className="hover:bg-CardBg gap-x-2 rounded-[10px] cursor-pointer grid font-normal text-sm grid-cols-[1fr_auto_auto] p-3"
                    >
                      <li>
                        <div className="flex flex-row gap-x-1 items-center">
                          <img src={coin.icon} className="w-4 h-4" />
                          <span>{coin.name}</span>
                        </div>
                      </li>
                      <li>{price ? `$${price.toFixed(2)}` : "Loading..."}</li>
                      <li className={`flex items-center gap-1 ${colorClass}`}>
                        {percent !== null ? (
                          <>
                            {percent >= 0 ? (
                              <TrendingUp />
                            ) : percent < 0 ? (
                              <TrendingDown />
                            ) : (
                              "-"
                            )}
                            {/* <span>{`${percent > 0 ? "+" : ""}${percent}%`}</span> */}
                          </>
                        ) : (
                          "-"
                        )}
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right section can be used for other UI or empty */}
          <div className="flex w-full">
            <TopUp />
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Home;
