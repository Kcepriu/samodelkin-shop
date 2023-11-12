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
    addressDelivery?: IAddressDelivery;
  };
}

interface IOrderFromCreate {
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
    products: IProductOrderCreate[];
    addressDelivery?: IAddressDeliveryForCreate;
  };
}

interface IProductOrder {
  id: number;
  count: number;
  sum: number;
  price: number;
  product: {
    data: IProduct;
  };
}

interface IProductOrderCreate {
  id: number;
  count: number;
  sum: number;
  price: number;
  product: number;
}
