export const formatNumber = (num) => {
  if (num === null || num === undefined || num === '') return num;
  const parsed = Number(num);
  if (isNaN(parsed)) return num;
  // Returns number rounded to max 3 decimal places, avoiding trailing zeros
  return Math.round(parsed * 1000) / 1000;
};
