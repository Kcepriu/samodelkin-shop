interface IResponseFavorite {
  data: IFavorite[];
  meta?: IMeta;
  error?: IError;
}

interface IResponseCreateFavorite {
  data: IFavorite;
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

interface IFavoriteForCreate {
  data: {
    products: Number[];
  };
}

interface IResponseFavoriteWithCode {
  code: number;
  data: IResponseFavorite | null;
}

interface IResponseCreateFavoriteWithCode {
  code: number;
  data: IResponseCreateFavorite | null;
}
