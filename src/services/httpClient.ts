"use client";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import {
  IAboutUserForCreate,
  IAboutUser,
  IMyInformation,
  IMyInformationFromCreate,
} from "@/types/aboutUser.types";

class HttpClientService {
  async getProductsByList(
    productsID: number[]
  ): Promise<IResponseProduct | null> {
    const url = `${FRONTEND_ROUTES.PRODUCT_BY_LIST}`;

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
    const url = `${FRONTEND_ROUTES.MARK_PRODUCT}/${typeMarkProduct}`;

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

  // * About Me
  async getAboutMe(accessToken: string): Promise<{
    isError: boolean;
    infoAboutMe: IMyInformation | null;
  }> {
    const url = `${FRONTEND_ROUTES.ABOUT_ME}`;

    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      isError: true,
      infoAboutMe: null,
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

      const response = (await res.json()) as IMyInformation;

      const infoAboutMe = res.status === 200 && !!response ? response : null;

      return {
        isError: res.status !== 200,
        infoAboutMe,
      };
    } catch {
      return result;
    }
  }

  // * About Me
  async getAboutUser(accessToken: string): Promise<{
    isAuth: boolean;
    aboutUser: IAboutUser | null;
  }> {
    const url = `${FRONTEND_ROUTES.ABOUT_USER}`;

    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      isAuth: false,
      aboutUser: null,
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

      const response = await res.json();

      const aboutUser = res.status === 200 && !!response ? response : null;

      return {
        isAuth: res.status === 200,
        aboutUser,
      };
    } catch {
      return result;
    }
  }
}

const httpClientServices = new HttpClientService();

export default httpClientServices;
