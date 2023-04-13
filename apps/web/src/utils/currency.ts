export const formatMoney = (val = "") => {
  const amount = Number(val);
  return amount >= 1000 ? `${amount / 1000}k` : amount;
};
