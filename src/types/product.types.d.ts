interface IResponseProduct {
  data: IProduct[];
  meta?: IMeta;
  error?: IError;
}

interface IProduct {
  id: number;
  attributes: {
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
    videos: IVideo[];
  };
}

interface IVideo {
  id: number;
  url: string;
  active: boolean;
  title: string;
}
