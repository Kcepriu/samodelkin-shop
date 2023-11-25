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
  count: number;
  sum: number;
  price: number;
  language: ILanguage;
  product: { data: IProduct };
}

interface ICartRowForSave {
  data: {
    products: IProductOrderCreate[];
  };
}

interface IResponseCartWithCode {
  code: number;
  data: ICartRow[] | null;
}
