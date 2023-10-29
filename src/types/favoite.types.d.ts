interface IResponseFavorite {
  data: IFavorite[];
  meta?: IMeta;
  error?: IError;
}

interface IFavorite {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    products: {
      data: IProduct[];
    };
  };
}
