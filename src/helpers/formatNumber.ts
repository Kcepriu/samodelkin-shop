export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uk").format(price);
};
