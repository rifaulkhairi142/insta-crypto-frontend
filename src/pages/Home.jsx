import React, { useEffect, useState } from "react";
import GuestLayout from "../layout/GuestLayout";
import { TrendingDown, TrendingUp } from "lucide-react";
import TopUp from "../component/TopUp";
import RecentsTransactions from "../component/RecentsTransactions";
import FAQ from "../component/FAQ";
import {getMe} from '../features/authSlice';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";



const cryptoList = [
  { icon: "/Etherium.png", name: "ETH", code: "ethidr" },
  { icon: "/polygon-matic-logo.png", name: "SOL", code: "polidr" },
  { icon: "/bnb-bnb-logo.png", name: "BNB", code: "bnbidr" },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, isLoading} = useSelector((state)=>state.auth);

  useEffect(()=>{
    dispatch(getMe());

  }, [dispatch]);

  useEffect(()=>{
    console.log("error ",isError);
   if(isError){
      navigate('/login');
    }

  });
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
    pol : null,
    bnb : null
  });

  const [error, setError] = useState(null);

  const [cryptoData, setCryptoData] = useState(null);

  const getPercentChange = (current, previous) => {
    if (previous === null || current === null) return null;
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(2);
  };

  useEffect(() => {
    const socketIndodax = new WebSocket("wss://ws3.indodax.com/ws/");

    socketIndodax.onopen = () => {
      console.log("WebSocket connected");

      // Step 1: Send auth message
      socketIndodax.send(
        JSON.stringify({
          id: 1,
          params: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo",
          },
        })
      );

      // Step 2: Subscribe to BTC/IDR ticker after a short delay
      setTimeout(() => {
        socketIndodax.send(
          JSON.stringify({
            method: 1,
            params: {
              channel: "market:summary-24h",
            },
            id: 2,
          })
        );
      }, 1000); // delay to ensure auth is processed first
    };

    let price = 0;

    socketIndodax.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.result &&
        data.result.channel === "market:summary-24h" &&
        data.result.data &&
        Array.isArray(data.result.data.data)
      ) {
        const marketData = data.result.data.data;

        // Find ethidr
        const ethData = marketData.find((item) => item[0] === "ethidr");
        const xrpData = marketData.find((item) => item[0] === "xrpidr");
        const btcData = marketData.find((item) => item[0] === "btcidr");
        const solData = marketData.find((item) => item[0] === "solidr");

        if (ethData) {
          const price = {
            symbol: ethData[0],
            timestamp: ethData[1],
            open: ethData[2],
            low: ethData[3],
            high: ethData[4],
            close: ethData[5],
            volumeBase: ethData[6],
            volumeQuote: ethData[7],
          };

          // console.log("ETHIDR data:", price);
        }

        if (xrpData) {
          const price = {
            symbol: ethData[0],
            timestamp: ethData[1],
            open: ethData[2],
            low: ethData[3],
            high: ethData[4],
            close: ethData[5],
            volumeBase: ethData[6],
            volumeQuote: ethData[7],
          };

          // console.log("XRPIDR data:", price);
        }
        if (btcData) {
          const price = {
            symbol: ethData[0],
            timestamp: ethData[1],
            open: ethData[2],
            low: ethData[3],
            high: ethData[4],
            close: ethData[5],
            volumeBase: ethData[6],
            volumeQuote: ethData[7],
          };

          // console.log("BTCIDR data:", price);
        }
        if (solData) {
          const price = {
            symbol: ethData[0],
            timestamp: ethData[1],
            open: ethData[2],
            low: ethData[3],
            high: ethData[4],
            close: ethData[5],
            volumeBase: ethData[6],
            volumeQuote: ethData[7],
          };

          // console.log("SOLIDR data:", price);
        }
        
      }
    };

    socketIndodax.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketIndodax.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socketIndodax.close();
      console.log("WebSocket cleaned up");
    };
  }, []);

  return (
    <GuestLayout>
      <div className="flex flex-col gap-y-8">
        <span className="text-3xl md:text-5xl font-bold text-center mb-12 text-textWhite">
          Indonesia Instant Crypto<br/> Currency Exchange
        </span>
        <div className="h-fit gap-3 font-binance-plex flex w-full flex-col gap-y-5">
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
        <RecentsTransactions/>
        <FAQ/>
      </div>
    </GuestLayout>
  );
};

export default Home;
