import React, { useEffect, useState } from "react";

const CryptoPrice = () => {
  const [prices, setPrices] = useState({
    BTC: null,
    ETH: null,
    SOL: null,
    XRP: null,
  });

  const [previousPrices, setPreviousPrices] = useState({
    BTC: null,
    ETH: null,
    SOL: null,
    XRP: null,
  });

  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const streams = [
  //     "btcusdt@markPrice",
  //     "ethusdt@markPrice",
  //     "solusdt@markPrice",
  //     "xrpusdt@markPrice",
  //   ];
  //   const url = `wss://fstream.binance.com/stream?streams=${streams.join("/")}`;
  //   const socket = new WebSocket(url);

  //   socket.onmessage = (event) => {
  //     try {
  //       const message = JSON.parse(event.data);
  //       const symbol = message.data.s; // e.g., BTCUSDT
  //       const newPrice = parseFloat(message.data.p); // price in USD

  //       const coin = symbol.replace("USDT", "");

  //       setPrices((prev) => ({
  //         ...prev,
  //         [coin]: newPrice,
  //       }));

  //       setPreviousPrices((prev) => ({
  //         ...prev,
  //         [coin]: prices[coin], // store old price for comparison
  //       }));
  //     } catch (err) {
  //       console.error("WebSocket parse error:", err);
  //       setError("Failed to parse WebSocket data.");
  //     }
  //   };

  //   socket.onerror = (err) => {
  //     console.error("WebSocket error:", err);
  //     setError("WebSocket connection error.");
  //   };

  //   return () => socket.close(); // Cleanup on unmount
  // }, [prices]); // re-run when prices update

  useEffect(() => {
    const socketIndodax = new WebSocket("wss://ws3.indodax.com/ws/");

    socketIndodax.onopen = () => {
      console.log("WebSocket connected");

      // Format the message properly if required by Indodax
      const message = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo",
      };

      socketIndodax.send(JSON.stringify(message));
    };

    socketIndodax.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data);
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

  // Calculate percent change helper
  const getPercentChange = (current, previous) => {
    if (previous === null || current === null) return null;
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(2);
  };

  return (
    <div className="p-4 rounded-xl border bg-gray-900 text-white max-w-md">
      <h2 className="text-lg font-bold mb-2">Crypto Prices (Futures, USD)</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {["BTC", "ETH", "SOL", "XRP"].map((coin) => {
          const price = prices[coin];
          const prev = previousPrices[coin];
          const percent = getPercentChange(price, prev);
          const colorClass =
            percent > 0
              ? "text-green-500"
              : percent < 0
              ? "text-red-500"
              : "text-gray-300";

          return (
            <li key={coin} className="flex justify-between">
              <span>
                {coin}: {price ? `$${price.toFixed(2)}` : "Loading..."}
              </span>
              {percent !== null && (
                <span className={colorClass}>
                  {percent > 0 ? "+" : ""}
                  {percent}%
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CryptoPrice;
