"use server";

import { revalidateTag } from "next/cache";
import httpServices from "./http";
import { TAGS_DATA } from "@/constants/app-keys.const";

// * get Product By List
export const getProductsByList = async (
  productsID: number[]
): Promise<IResponseProduct | null> => {
  return await httpServices.getProductsByList(productsID);
};

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

// * Mark Product
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
    code === 200 && !!response?.data && response?.data.length > 0
      ? response.data[0].attributes.products.data
      : [];

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

// * Cart
export const getCart = async (): Promise<{
  isAuth: boolean;
  products: ICartRow[];
}> => {
  const { code, data: response } = await httpServices.getCart();

  const saveProducts = code === 200 && !!response ? response : [];

  return {
    isAuth: code === 200,
    products: saveProducts,
  };
};

export const saveCart = async (
  products: ICartRowForSave
): Promise<{
  isAuth: boolean;
  products: ICartRow[];
}> => {
  const { code, data: response } = await httpServices.saveCart(products);

  const saveProducts = code === 200 && !!response ? response : [];

  return {
    isAuth: code === 200,
    products: saveProducts,
  };
};

// * Order
export const createOrder = async (
  order: IOrderFromCreate
): Promise<{
  order: IOrder | null;
}> => {
  const { code, data: response } = await httpServices.createOrder(order);

  const createdOrder = code === 200 ? response : null;

  if (code === 200) revalidateTag(TAGS_DATA.ORDERS);
  return {
    order: createdOrder,
  };
};

export const getOrders = async (page = "1") => {
  const { code, data: response } = await httpServices.getOrders(page);

  const orders = code === 200 ? response : null;

  return orders;
};
