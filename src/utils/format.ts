export const formatEth = (value: number | string): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return `${num.toFixed(8)} ETH`;
};

export const formatUsd = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};