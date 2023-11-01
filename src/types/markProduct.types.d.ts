interface IResponseMarkProduct {
  data: IMarkProduct[];
  meta?: IMeta;
  error?: IError;
}

interface IResponseCreateMarkProduct {
  data: IMarkProduct;
  meta?: IMeta;
  error?: IError;
}

interface IMarkProduct {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    products: {
      data: IProduct[];
    };
  };
}

interface IMarkProductForCreate {
  data: {
    products: Number[];
  };
}

interface IResponseMarkProductWithCode {
  code: number;
  data: IResponseMarkProduct | null;
}

interface IResponseCreateMarkProductWithCode {
  code: number;
  data: IResponseCreateMarkProduct | null;
}
