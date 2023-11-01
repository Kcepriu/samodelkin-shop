import { BACKEND_ROUTES } from "@/constants/app-keys.const";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";

import {
  IResponseAboutUs,
  IResponseCategoryDescription,
  IResponseProductDescription,
} from "@/types/articles.type";

class HttpService {
  private accessToken: string = "";
  private baseUrl: string = "";
  private countPageOnPage: string = "16";
  private countReviewsOnPage: string = "4";

  constructor() {
    this.baseUrl = process.env.BACKEND_URL || "";
    this.countPageOnPage = process.env.COUNT_PRODUCT_ON_PAGE || "16";
    this.countReviewsOnPage = process.env.COUNT_REVIEWS_ON_PAGE || "4";
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

  async logIn(
    identifier: string,
    password: string
  ): Promise<IResponseAuth | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.LOGIN}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

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
      const res = await fetch(url, { next: { revalidate: 60 } });

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
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * get About Us
  async getAboutUs(): Promise<IResponseAboutUs | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.ABOUT_US}`;

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

  // * get CATEGORY_DESCRIPTION
  async getCategoryDescriptions(
    idCategory: string
  ): Promise<IResponseCategoryDescription | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.CATEGORY_DESCRIPTION}/${idCategory}`;

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

  // * get PRODUCT_DESCRIPTION
  async getProductDescriptions(
    productId: string
  ): Promise<IResponseProductDescription | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.PRODUCT_DESCRIPTION}/${productId}`;

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

  // * get Last Reviews for HOME page
  async getLastReviews(category?: string): Promise<IResponseReviews | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.LAST_REVIEWS}`;

    const filterCategory = category ? `?category=${category}` : "";

    try {
      const res = await fetch(url + filterCategory);

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * get Product Reviews
  async getProductReviews(
    productId: string,
    page = "1"
  ): Promise<IResponseReviews | null> {
    const paramsObj: { [key: string]: string } = {
      "filters[product][id][$eq]": productId,
      //TODO Enable filter
      // "filters[isPublication][$eq]": "true",
      "pagination[pageSize]": this.countReviewsOnPage,
      "pagination[page]": page,
      "sort[0]": "date:desc",
    };
    const params = new URLSearchParams(paramsObj);
    const url = `${this.baseUrl}${BACKEND_ROUTES.REVIEWS}?${params}`;

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

  // * get getUser Reviews
  async getUserReviews(
    userId: string,
    page = "1"
  ): Promise<IResponseReviews | null> {
    const paramsObj: { [key: string]: string } = {
      //TODO add filter USER
      // "filters[product][id][$eq]": productId,
      // "filters[isPublication][$eq]": "true",
      "pagination[pageSize]": this.countReviewsOnPage,
      "pagination[page]": page,
      "sort[0]": "date:desc",
    };
    const params = new URLSearchParams(paramsObj);
    const url = `${this.baseUrl}${BACKEND_ROUTES.REVIEWS}?${params}`;

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

  // * Create Product Reviews
  async createProductReviews(
    review: ICreateReview
  ): Promise<IResponseOneReviews | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.REVIEWS}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          // "API-Key": "my key",
        },
        body: JSON.stringify(review),
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * Create Reply To Reviews
  async createReplyToReviews(
    reviewId: string,
    reply: ICreateReply
  ): Promise<IResponseOneReviews | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.REPLY_TO_REVIEWS}/${reviewId}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          // "API-Key": "my key",
        },
        body: JSON.stringify(reply),
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * Change Status Review
  async changeStatusReview(
    reviewId: string,
    review: IChangeStatusReview
  ): Promise<IResponseOneReviews | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.CHANGE_STATUS_REVIEWS}/${reviewId}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          // "API-Key": "my key",
        },
        body: JSON.stringify(review),
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * Change Reply To Review
  async changeReplyToReview(
    reviewId: string,
    replyId: string,
    reply: IChangeReplyToReview
  ): Promise<IResponseOneReviews | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.CHANGE_REPLY_TO_REVIEWS}/${reviewId}/${replyId}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          // "API-Key": "my key",
        },
        body: JSON.stringify(reply),
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  // * getFavorites
  async getFavorites(): Promise<IResponseFavoriteWithCode> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.FAVORITES}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: null,
    } as IResponseFavoriteWithCode;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
        },
      });

      result.code = res.status;

      if (!res.ok) {
        return result;
      }

      result.data = (await res.json()) as IResponseFavorite;

      return result;
    } catch {
      return result;
    }
  }

  // * save Favorites
  async saveFavorites(
    favorites: IFavoriteForCreate
  ): Promise<IResponseCreateFavoriteWithCode> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.FAVORITES}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: null,
    } as IResponseCreateFavoriteWithCode;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
        },
        body: JSON.stringify(favorites),
      });

      result.code = res.status;

      if (!res.ok) {
        return result;
      }

      result.data = (await res.json()) as IResponseCreateFavorite;

      return result;
    } catch {
      return result;
    }
  }
}

const httpServices = new HttpService();

export default httpServices;
