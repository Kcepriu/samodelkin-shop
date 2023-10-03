import { cookies } from "next/headers";

import { STORAGE_KEYS, BACKEND_ROUTES } from "@/constants/app-keys.const";
import { IResponseAboutUs } from "@/types/articles.type";

class HttpService {
  private accessToken: string = "";
  private baseUrl: string = "";
  private countPageOnPage: string = "16";

  constructor() {
    this.baseUrl = process.env.BACKEND_URL || "";
    this.countPageOnPage = process.env.COUNT_PRODUCT_ON_PAGE || "16";

    this.setAuthHeader(this.readTokenFromLocalStorage());
  }

  private readTokenFromLocalStorage(): string {
    try {
      const data: string = "";
      // const cookieStore = cookies();

      // cookies().set(STORAGE_KEYS.JWT_TOKEN_AUTH, "token", { secure: true });

      // const dataCoock = cookieStore.get(STORAGE_KEYS.JWT_TOKEN_AUTH);
      // console.log("🚀 ~ dataCoock:", dataCoock);

      // const data: string =
      //   localStorage.getItem(STORAGE_KEYS.JWT_TOKEN_AUTH) || "";
      return data;
    } catch {
      return "";
    }
  }

  private async saveTokenToLocalStorage(token: string) {
    // localStorage.setItem(STORAGE_KEYS.JWT_TOKEN_AUTH, token);
    // cookies().set(STORAGE_KEYS.JWT_TOKEN_AUTH, "token", { secure: true });
  }

  setAuthHeader = async (accessToken: string) => {
    this.accessToken = accessToken;
    await this.saveTokenToLocalStorage(this.accessToken);
  };

  // * get Products
  async getProducts({
    page = "1",
    category = "",
  }: {
    page: string;
    category: string;
  }): Promise<IResponseProduct | null> {
    const paramsObj: { [key: string]: string } = {
      "pagination[pageSize]": this.countPageOnPage,
      "pagination[page]": page,
    };
    if (category !== "") paramsObj["filters[categories][slug][$eq]"] = category;

    const params = new URLSearchParams(paramsObj);
    const url = `${this.baseUrl}${BACKEND_ROUTES.PRODUCTS}?${params}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * get ONE Products
  async getOneProducts(slug: string): Promise<IResponseProduct | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.PRODUCTS}/${slug}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * get sales leaders
  async getSalesLeaders(): Promise<IResponseProduct | null> {
    const paramsObj: { [key: string]: string } = {
      "pagination[pageSize]": "24",
      "pagination[page]": "1",
    };

    const params = new URLSearchParams(paramsObj);
    const url = `${this.baseUrl}${BACKEND_ROUTES.PRODUCTS}?${params}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * get Categories
  async getCategories(): Promise<IResponseCategories | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.CATEGORIES}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        // throw new Error("Failed to fetch data");
        return null;
      }

      return res.json();
    } catch {
      // throw new Error("Failed to fetch data");
      return null;
    }
  }

  // * get About Us
  async getAboutUs(): Promise<IResponseAboutUs | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.ABOUT_US}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        // throw new Error("Failed to fetch data");
        return null;
      }

      return res.json();
    } catch {
      // throw new Error("Failed to fetch data");
      return null;
    }
  }

  // * get Last Reviews for HOME page
  async getLastReviews(): Promise<IResponseAboutUs | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.ABOUT_US}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        // throw new Error("Failed to fetch data");
        return null;
      }

      return res.json();
    } catch {
      // throw new Error("Failed to fetch data");
      return null;
    }
  }
}

const httpServices = new HttpService();

export default httpServices;
