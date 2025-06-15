export const formatCurrencyToIDR = (val) => {
    if (!val) return "";
    const number = parseInt(val.toString().replace(/\D/g, ""), 10);
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };