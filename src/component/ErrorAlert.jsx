import React, { useState, useEffect } from "react";

const ErrorAlert = ({ message = "Terjadi kesalahan." }) => {
  const [visible, setVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => setVisible(false), 300); // sama dengan duration animasi
  };

  // Animate in on mount
  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setAnimateIn(true);
    }, 10); // sedikit delay agar transition berlaku

    const autoCloseTimer = setTimeout(handleClose, 5000);

    return () => {
      clearTimeout(autoCloseTimer);
      clearTimeout(enterTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 z-50 w-[90%] max-w-sm sm:max-w-md md:max-w-lg">
      <div
        className={`flex items-center p-4 rounded-md justify-between shadow-md border border-textSell transition-all duration-300 ease-in-out
          ${
            animateOut
              ? "opacity-0 scale-95 translate-y-2"
              : animateIn
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2"
          }
          bg-bg text-textSell`}
        role="alert"
      >
        {/* Icon */}
        <svg
          className="w-5 h-5 flex-shrink-0 text-textSell"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>

        {/* Message */}
        <div className="ml-3 flex-1 text-sm text-gray-300 font-binance-plex font-medium leading-snug">
          {message}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="ml-3 text-textSell hover:text-red-300 p-1 rounded transition"
          aria-label="Tutup"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
