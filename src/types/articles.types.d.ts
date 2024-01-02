import { TypeArticles } from "./generalTypes/articles.type";

// * About Us
interface IResponseGeneralPage {
  data: {
    id: number;
    attributes: {
      content: TArticleGeneral[];
      seo?: ISeo;
    };
  };
}

// * MainPage
interface IResponseMainPage {
  data: {
    id: number;
    attributes: {
      banner: {
        data: IImage[] | null;
      };
      seo?: ISeo;
      phoneNumber: string;
      telegram: string;
      workingHours: string;
    };
  };
}

// * Category Description;
interface IResponseCategoryDescription {
  data: ICategoryDescription[];
}

interface ICategoryDescription {
  id: number;
  attributes: {
    category: {
      data: {
        id: number;
        attributes: {
          slug: string;
        };
      };
    };
    content: TArticleGeneral[];
  };
}

// * Product Description
interface IResponseProductDescription {
  data: IProductDescription[];
}

interface IProductDescription {
  id: number;
  attributes: {
    product: {
      data: {
        id: number;
        attributes: {
          slug: string;
        };
      };
    };
    content: TArticleGeneral[];
  };
}

// * General Type
type TArticleGeneral =
  | ITitleArticle
  | IContentImageArticle
  | IImageArticle
  | IContentArticle;

interface ITitleArticle {
  id: number;
  __component: TypeArticles.Title;
  title: string;
  levelTitle: number;
}

interface IContentImageArticle {
  id: number;
  __component: TypeArticles.ContentImage;
  content: string;
  percentImage: number;
  reverseDirection: boolean;
  description: string;
  image: {
    data: IImage;
  };
}

interface IContentArticle {
  id: number;
  __component: TypeArticles.Content;
  content: string;
  description: string;
}

interface IImageArticle {
  id: number;
  __component: TypeArticles.Image;
  description: string;
  image: {
    data: IImage;
  };
}
