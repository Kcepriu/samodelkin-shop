interface IValuesFormCreateReview {
  firstName: string;
  lastName: string;
  content: string;
  advantages: string;
  disAdvantages: string;
  rating: number;
  product: number;
}
interface IValuesFormCreateReply {
  firstName: string;
  lastName: string;
  content: string;
}

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
    firstName: string;
    lastName: string;
    product: { data: IProduct };
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
  firstName: string;
  lastName: string;
}

interface ICreateReview {
  data: {
    firstName: string;
    lastName: string;
    content: string;
    advantages: string;
    disAdvantages: string;
    rating: number;
    product: number;
  };
}

interface ICreateReply {
  data: IValuesFormCreateReply;
}

interface IChangeStatusReview {
  data: {
    isPublication: boolean;
  };
}

interface IChangeReplyToReview {
  data: {
    isPublication: boolean;
    content: string;
  };
}

interface IInfoProductReview {
  data: [
    {
      attributes: {
        count: number;
        sum: number;
        avg: number;
      };
    }
  ];
}
