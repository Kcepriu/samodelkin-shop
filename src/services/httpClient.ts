"use client";
import { BACKEND_ROUTES } from "@/constants/app-keys.const";
class HttpClientService {
  async getProductsByList(
    productsID: number[]
  ): Promise<IResponseProduct | null> {
    const url = "/api/get_products_by_list";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        body: JSON.stringify(productsID),
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * get Mark Product
  async getMarkProduct(
    typeMarkProduct: string,
    accessToken: string
  ): Promise<{
    isAuth: boolean;
    markProduct: IProduct[];
  }> {
    const url = `/api/get_mark_product/${typeMarkProduct}`;

    const Authorization = `Bearer ${accessToken}`;

    const result = {
      isAuth: false,
      markProduct: [],
    };

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
        },
      });

      if (!res.ok) {
        return result;
      }

      const response = (await res.json()) as IResponseMarkProduct;

      const markProduct =
        res.status === 200 && !!response?.data && response?.data.length > 0
          ? response.data[0].attributes.products.data
          : [];

      return {
        isAuth: res.status === 200,
        markProduct,
      };
    } catch {
      return result;
    }
  }
}

const httpClientServices = new HttpClientService();

export default httpClientServices;
