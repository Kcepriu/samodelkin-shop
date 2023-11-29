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
    languages: ILanguage[];
    manual: IManual[];
  };
}

interface IVideo {
  id: number;
  url: string;
  active: boolean;
  title: string;
}

interface ILanguage {
  id?: number;
  language: TypeLanguage;
}

interface IManual {
  id: number;
  description: string;
  file: {
    data: IFile;
  };
}
