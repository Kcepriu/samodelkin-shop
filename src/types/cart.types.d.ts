interface IResponseCart {
  data: ICart[];
  meta?: IMeta;
  error?: IError;
}

interface IResponseSaveCart {
  data: ICart;
  meta?: IMeta;
  error?: IError;
}

interface ICart {
  id: number;
  attributes: {
    products: ICartRow[];
  };
}

interface ICartRow {
  id: number | string;
  product: { data: IProduct };
  count: number;
  price: number;
  sum: number;
}

interface ICartRowForSave {
  data: {
    products: {
      product: number;
      count: number;
      price: number;
      sum: number;
    }[];
  };
}

interface IResponseCartWithCode {
  code: number;
  data: ICartRow[] | null;
}
