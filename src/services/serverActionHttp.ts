"use server";

import httpServices from "./http";

// * get Product Reviews
export const getProductReviews = async (
  productId: string,
  page = "1"
): Promise<IResponseReviews | null> => {
  return await httpServices.getProductReviews(productId, page);
};

export const getUserReviews = async (
  userId: string,
  page = "1"
): Promise<IResponseReviews | null> => {
  return await httpServices.getUserReviews(userId, page);
};

export const createProductReviews = async (
  review: ICreateReview
): Promise<IResponseOneReviews | null> => {
  return await httpServices.createProductReviews(review);
};

export const createReplyToReviews = async (
  reviewsId: string,
  reply: ICreateReply
): Promise<IResponseOneReviews | null> => {
  return await httpServices.createReplyToReviews(reviewsId, reply);
};

export const changeStatusReview = async (
  reviewId: string,
  review: IChangeStatusReview
): Promise<IResponseOneReviews | null> => {
  return await httpServices.changeStatusReview(reviewId, review);
};

export const changeReplyToReview = async (
  reviewId: string,
  replyId: string,
  reply: IChangeReplyToReview
): Promise<IResponseOneReviews | null> => {
  return await httpServices.changeReplyToReview(reviewId, replyId, reply);
};

export const getMarkProduct = async (
  typeMarkProduct: string
): Promise<{
  isAuth: boolean;
  markProduct: IProduct[];
}> => {
  // {BACKEND_ROUTES.FAVORITES}
  const { code, data: response } = await httpServices.getMarkProduct(
    typeMarkProduct
  );

  const markProduct =
    code === 200 && !!response ? response.data[0].attributes.products.data : [];

  return {
    isAuth: code === 200,
    markProduct,
  };
};

export const saveMarkProduct = async (
  markProductsToCreate: IMarkProductForCreate,
  typeMarkProduct: string
): Promise<{
  isAuth: boolean;
  markProducts: IProduct[];
}> => {
  const { code, data: response } = await httpServices.saveMarkProduct(
    markProductsToCreate,
    typeMarkProduct
  );

  const markProducts =
    code === 200 && !!response ? response.data.attributes.products.data : [];

  return {
    isAuth: code === 200,
    markProducts,
  };
};
