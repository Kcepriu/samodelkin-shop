interface IResponseProduct {
  data: IProduct[];
  meta?: IMeta;
  error?: IError;
}

interface IProduct {
  id: number;
  attributes: IAttributesProduct;
}

interface IAttributesProduct {
  code: string;
  createdAt: string;
  updatedAt: string;
  countPlayers: number;
  slug: string;
  descrition: string;
  title: string;
  price: number;
  available: boolean;
  additions: boolean;
  categories?: IResponseCategories;
  images?: IResponseImages;
}
