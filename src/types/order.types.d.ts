interface IResponseOrder {
  data: IOrder[];
  meta?: IMeta;
}

interface IOrder {
  id: number;
  attributes: IAttributesOrder;
}

interface IAttributesOrder {
  date: string;
  totalSum: number;
  createdAt: string;
  updatedAt: string;
  numberPhone: string;
  email: string;
  name: string;
  comment: string;
  products: IProductOrder[];
  adresDelivery?: IAdresDelivery;
}

interface IProductOrder {
  id: number;
  count: number;
  sum: number;
  price: number;
  product: IResponseProductOrder;
}

interface IResponseProductOrder {
  data: IProduct;
}
