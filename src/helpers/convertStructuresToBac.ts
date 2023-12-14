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
  contactInformation,
  comment,
}: {
  products: ICartRow[];
  addressDelivery: IAddressDeliveryForCreate;
  contactInformation: IContactInformationForCreate;
  comment: string;
}): IOrderFromCreate => {
  const {
    data: { products: convertProducts },
  } = convertCartToCreate(products);

  const totalSum = getTotalSumCart(products);
  // -
  return {
    data: {
      totalSum,
      addressDelivery,
      contactInformation,
      products: convertProducts,
      comment,
    },
  };
};

export const convertProductToArrayId = (favorites: IProduct[]): number[] => {
  const products = favorites.map((element) => element.id);
  return products;
};

export const convertAboutUserToCreate = (
  newInformation: IAboutUserStore
): IAboutUserForCreate => {
  return {
    data: {
      ...newInformation,
    },
  };
};

export const convertAboutUserToStore = (
  newInformation: IAboutUser | null
): IAboutUserStore | null => {
  if (!newInformation) return null;

  const {
    id: idAddressDelivery,
    delivery_service,
    ...addressDelivery
  } = newInformation.attributes.addressDelivery;

  const { id: idContactInformation, ...contactInformation } =
    newInformation.attributes.contactInformation;

  return {
    addressDelivery: {
      ...addressDelivery,
      delivery_service: delivery_service.data.id,
    },
    contactInformation,
  };
};
