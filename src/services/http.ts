import { BACKEND_ROUTES, FRONTEND_ROUTES } from "@/constants/app-keys.const";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import { getCsrfToken } from "next-auth/react";
import { getSession } from "next-auth/react";

import {
  IResponseAboutUs,
  IResponseCategoryDescription,
  IResponseProductDescription,
} from "@/types/articles.type";

class HttpService {
  private baseUrl: string = "";
  private frontUrl: string = "";

  private countPageOnPage: string = "16";
  private countReviewsOnPage: string = "4";

  constructor() {
    this.baseUrl = process.env.BACKEND_URL || "";
    this.frontUrl = process.env.NEXTAUTH_URL || "";
    this.countPageOnPage = process.env.COUNT_PRODUCT_ON_PAGE || "16";
    this.countReviewsOnPage = process.env.COUNT_REVIEWS_ON_PAGE || "4";
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

  //TODO Delete this function
  async localSignOut() {
    console.log("222222222222");
    // const url = `${this.frontUrl}${FRONTEND_ROUTES.SIGNOUT}?csrf=true`;
    const url = "http://localhost:3000/api/auth/signout?csrf=true";
    // const url = "http://localhost:3000/api/test";

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    // Accept: "application/json",
    // Authorization: Authorization,
    // csrfToken: await getCsrfToken(),
    try {
      // const res = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     "Access-Control-Allow-Headers": "Content-Type, Authorization",
      //     Authorization: Authorization,
      //   },
      //   // @ts-expect-error
      //   body: new URLSearchParams({
      //     // csrfToken: await getCsrfToken(),
      //     csrfToken:
      //       "a558a3fffa64a68bd9d2740a0b035dc9f04d0e1658f38979127a7c977c2b9465",
      //     callbackUrl: "/",
      //     json: true,
      //   }),
      // });

      // console.log("🚀 ~ res:", res.status);

      // const data = await res.json();
      // console.log("🚀 ~ data:", data);

      // const fetchOptions = {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   // @ts-expect-error
      //   body: new URLSearchParams({
      //     csrfToken: await getCsrfToken(),
      //     json: true,
      //   }),
      // };

      // const res = await fetch(url, fetchOptions);

      // console.log("Before");
      // const data = await res.json();
      // console.log("🚀 ~ data:", data);

      // if (!res.ok) {
      //   return null;
      // }

      return "OK";
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
  // ! Add auth
  async getUserReviews(
    userId: string,
    page = "1"
  ): Promise<IResponseReviews | null> {
    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

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
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
        },
      });

      if (!res.ok) {
        return null;
      }
      return res.json();
    } catch {
      return null;
    }
  }

  // * Create Product Reviews
  // ! Add auth
  async createProductReviews(
    review: ICreateReview
  ): Promise<IResponseOneReviews | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.REVIEWS}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
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
  // ! Add auth
  async createReplyToReviews(
    reviewId: string,
    reply: ICreateReply
  ): Promise<IResponseOneReviews | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.REPLY_TO_REVIEWS}/${reviewId}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
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
  // ! Add auth
  async changeStatusReview(
    reviewId: string,
    review: IChangeStatusReview
  ): Promise<IResponseOneReviews | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.CHANGE_STATUS_REVIEWS}/${reviewId}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
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
  // ! Add auth
  async changeReplyToReview(
    reviewId: string,
    replyId: string,
    reply: IChangeReplyToReview
  ): Promise<IResponseOneReviews | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.CHANGE_REPLY_TO_REVIEWS}/${reviewId}/${replyId}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
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

  // * get Mark Product
  async getMarkProduct(
    typeMarkProduct: string
  ): Promise<IResponseMarkProductWithCode> {
    const url = `${this.baseUrl}${typeMarkProduct}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: null,
    } as IResponseMarkProductWithCode;

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

      result.data = (await res.json()) as IResponseMarkProduct;

      return result;
    } catch {
      return result;
    }
  }

  // * save Favorites
  async saveMarkProduct(
    markProducts: IMarkProductForCreate,
    typeMarkProduct: string
  ): Promise<IResponseCreateMarkProductWithCode> {
    const url = `${this.baseUrl}${typeMarkProduct}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: null,
    } as IResponseCreateMarkProductWithCode;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
        },
        body: JSON.stringify(markProducts),
      });

      result.code = res.status;

      if (!res.ok) {
        return result;
      }

      result.data = (await res.json()) as IResponseCreateMarkProduct;

      return result;
    } catch {
      return result;
    }
  }

  // ! CART
  // * get Cart
  async getCart(): Promise<IResponseCartWithCode> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.CART}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: null,
    } as IResponseCartWithCode;

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

      const response = (await res.json()) as IResponseCart;

      result.data = response.data[0].attributes.products || [];

      return result;
    } catch {
      return result;
    }
  }

  // * save Cart
  async saveCart(products: ICartRowForSave): Promise<IResponseCartWithCode> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.CART}`;
    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: [],
    } as IResponseCartWithCode;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
        },
        body: JSON.stringify(products),
      });

      result.code = res.status;

      if (!res.ok) {
        return result;
      }
      const response = (await res.json()) as IResponseSaveCart;
      result.data = response.data.attributes.products || [];

      return result;
    } catch {
      return result;
    }
  }
}

const httpServices = new HttpService();

export default httpServices;
