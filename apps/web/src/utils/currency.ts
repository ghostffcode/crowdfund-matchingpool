export const formatMoney = (val = "") => {
  const amount = parseFloat(Number(val).toFixed(4));
  return amount >= 1000 ? `${amount / 1000}k` : amount;
};
