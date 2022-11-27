import { month } from "../constants/month";

export const formatDate = (date) => {
  const { $D, $M, $y } = date;
  return `${month[$M]}-${$D}-${$y}`;
};
