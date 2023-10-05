interface IResponseReviews {
  data: IReview[];
  meta: IMeta;
  error?: IError;
}

interface IResponseOneReviews {
  data: IReview;
  error?: IError;
}

interface IReview {
  id: number;
  attributes: {
    date: string;
    rating: number;
    content: string;
    advantages: string;
    disAdvantages: string;
    shortContent: string;
    isPublication: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    firstName: any;
    secondName: any;
    product: IProduct;
    replyReview: IReplyReview[];
  };
}

interface IShortProduct {
  data: {
    id: 1;
    attributes: {
      code: string;
      slug: string;
      descrition: string;
      title: string;
      images: IResponseImages;
    };
  };
}

interface IReplyReview {
  id: number;
  content: string;
  date: string;
  isPublication: boolean;
  firstName: any;
  secondName: any;
}
