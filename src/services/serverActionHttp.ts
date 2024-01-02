"use server";

import { revalidateTag } from "next/cache";
import httpServices from "./http";
import httpApiNovaPoshta from "./httpApiNovaPoshta";
import { TAGS_DATA } from "@/constants/app-keys.const";
import {
  IAboutUserForCreate,
  IAboutUser,
  IMyInformation,
  IMyInformationFromCreate,
} from "@/types/aboutUser.types";

// * get Product By List
export const getProductsByList = async (
  productsID: number[]
): Promise<IResponseProduct | null> => {
  const result = await httpServices.getProductsByList(productsID);
  return result;
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

export const deleteReview = async (
  reviewId: string
): Promise<IResponseOneReviews | null> => {
  return await httpServices.deleteReview(reviewId);
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

export const searchCityNP = async (nameCity: string) => {
  const response = await httpApiNovaPoshta.searchCity(nameCity);

  return response;
};

export const searchWarehouses = async (
  idCity: string,
  nameWarehouses: string
) => {
  const response = await httpApiNovaPoshta.searchWarehouses(
    idCity,
    nameWarehouses
  );

  return response;
};

// * About User
export const getAboutUser = async (): Promise<{
  isAuth: boolean;
  aboutUser: IAboutUser | null;
}> => {
  const { code, data: response } = await httpServices.getAboutUser();

  const aboutUser = code === 200 && !!response ? response : null;

  return {
    isAuth: code === 200,
    aboutUser,
  };
};

export const saveAboutUser = async (
  information: IAboutUserForCreate
): Promise<{
  isAuth: boolean;
  aboutUser: IAboutUser | null;
}> => {
  const { code, data: response } = await httpServices.saveAboutUser(
    information
  );

  const aboutUser = code === 200 && !!response ? response : null;

  return {
    isAuth: code === 200,
    aboutUser,
  };
};

// * About ME
export const getAboutMe = async (): Promise<{
  isError: boolean;
  infoAboutMe: IMyInformation | null;
}> => {
  const { code, data: response } = await httpServices.getAboutMe();
  const infoAboutMe = code === 200 && !!response ? response : null;

  return {
    isError: code !== 200,
    infoAboutMe,
  };
};

export const saveAboutMe = async (
  information: IMyInformationFromCreate
): Promise<{
  isError: boolean;
  infoAboutMe: IMyInformation | null;
}> => {
  const { code, data: response } = await httpServices.saveAboutMe(information);

  const infoAboutMe = code === 200 && !!response ? response : null;

  return {
    isError: code !== 200,
    infoAboutMe,
  };
};
