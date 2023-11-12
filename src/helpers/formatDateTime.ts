import format from "date-fns/format";

export const formatDateOrder = (date: Date | number) => {
  if (!date) return;

  const newDate = typeof date === "number" ? date : Number(date);

  return format(newDate, "dd.MM.YYY");
};
