interface IResponseOrder {
  data: IOrder[] | null;
  meta?: IMeta;
  code?: number;
}

interface IResponseCreateOrder {
  data: IOrder | null;
  meta?: IMeta;
  code?: number;
}

interface IOrder {
  id: number;
  attributes: {
    date: string;
    totalSum: number;
    createdAt: string;
    updatedAt: string;
    numberPhone: string;
    email: string;
    name: string;
    comment: string;
    products: IProductOrder[];
    addressDelivery: IAddressDelivery;
    contactInformation: IContactInformation;
  };
}

interface ICustomersContact {
  numberPhone: string;
  email: string;
  name: string;
  comment: string;
}
interface IOrderFromCreate {
  data: {
    totalSum: number;
    comment: string;
    products: IProductOrderCreate[];
    addressDelivery: IAddressDeliveryForCreate;
    contactInformation: IContactInformationForCreate;
  };
}

interface IProductOrder {
  id: number;
  count: number;
  sum: number;
  price: number;
  language: ILanguage;
  product: {
    data: IProduct;
  };
}

interface IProductOrderCreate {
  product: number;
  count: number;
  price: number;
  sum: number;
}
