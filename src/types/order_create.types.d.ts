interface IRequestOrderCreate {
  data: IOrderForCreate;
}

interface IResponseOrderCreate {
  data: IProduct;
}

interface IOrderForCreate {
  totalSum: number;
  numberPhone: string;
  email: string;
  name: string;
  comment: string;
  products: IProductForCreate[];
  adresDelivery: IAdresDeliveryForCreate;
}

interface IProductForCreate {
  count: number;
  sum: number;
  price: number;
  product: number;
}
