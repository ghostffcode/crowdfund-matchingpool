export const truncate = (str = "", maxLength = Infinity) => {
  return str.length >= maxLength ? str.slice(0, maxLength) + "..." : str;
};
