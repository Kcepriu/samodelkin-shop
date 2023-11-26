export const convertCartToCreate = (products: ICartRow[]): ICartRowForSave => {
  const convertProducts = products.map(({ id, ...row }) => ({
    ...row,
    product: row.product.data.id,
    language: { language: row.language.language },
  }));
  return {
    data: { products: convertProducts },
  };
};

export const convertFavoritesToCreate = (
  favorites: IProduct[]
): IMarkProductForCreate => {
  const products = favorites.map((element) => element.id);
  return {
    data: { products },
  };
};

export const convertRevisedToCreate = (
  revised: IProduct[]
): IMarkProductForCreate => {
  const products = revised.map((element) => element.id);
  return {
    data: { products },
  };
};

export const getTotalSumCart = (products: ICartRow[]): number => {
  const totalSum =
    products?.reduce((totalSum, product) => totalSum + product.sum, 0) || 0;

  return totalSum;
};

export const convertOrderToCreate = ({
  products,
  addressDelivery,
  contacts,
}: {
  products: ICartRow[];
  addressDelivery: IAddressDeliveryForCreate;
  contacts: ICustomersContact;
}): IOrderFromCreate => {
  const {
    data: { products: convertProducts },
  } = convertCartToCreate(products);
  const totalSum = getTotalSumCart(products);
  // -
  return {
    data: {
      ...contacts,
      totalSum,
      addressDelivery,
      products: convertProducts,
    },
  };
};

export const convertProductToArrayId = (favorites: IProduct[]): number[] => {
  const products = favorites.map((element) => element.id);
  return products;
};
