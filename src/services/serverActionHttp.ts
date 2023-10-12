"use server";

import httpServices from "./http";

// * get Product Reviews
export const getProductReviews = async (
  productId: string,
  page = "1"
): Promise<IResponseReviews | null> => {
  return httpServices.getProductReviews(productId, page);
};
