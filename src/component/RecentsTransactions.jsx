import React from "react";

const RecentsTransactions = () => {
  return (
    <section className="flex flex-col gap-y-3 ">
      <h2 className="font-binance-plex font-bold md:text-5xl text-center text-3xl text-textWhite">
        Recents Transactions
      </h2>
      <ul className="flex flex-col gap-y-2 mt-10">
        <li className="flex justify-between bg-bg6 py-2 px-5 items-center text-white rounded-lg">
          <div className="text-lg text-white">2 menit yang lalu</div>
          <div className="flex flex-row items-center gap-x-2"><span>0.123 ETH</span> <img src="/Etherium.png" className="w-8 h-8"></img></div>
        </li>
        <li className="flex justify-between bg-bg6 py-2 px-5 items-center text-white rounded-lg">
          <div className="text-lg text-white">2 menit yang lalu</div>
          <div className="flex flex-row items-center gap-x-2"><span>0.123 ETH</span> <img src="/Etherium.png" className="w-8 h-8"></img></div>
        </li>
      </ul>
    </section>
  );
};

export default RecentsTransactions;
 