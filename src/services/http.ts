import { BACKEND_ROUTES, FRONTEND_ROUTES } from "@/constants/app-keys.const";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import { TAGS_DATA } from "@/constants/app-keys.const";

import {
  IResponseAboutUs,
  IResponseCategoryDescription,
  IResponseProductDescription,
  IResponseMainPage,
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

  // * AUTH
  // * ------------

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

  // * PRODUCT
  // * ------------
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

  // * get SALES LEADERS
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

  // * CATEGORIES
  // * ------------
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

  // * PAGES
  // * ------------
  // * get PAGE About Us
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

  // * get PAGE  CATEGORY DESCRIPTION
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

  // * get PAGE  PRODUCT DESCRIPTION
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

  // * get PAGE Main Page
  async getMainPage(): Promise<IResponseMainPage | null> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.MAIN_PAGE}`;

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

  //  * REVIEWS
  // * ------------
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

  // * MARK PRODUCTS (FAVORITES, REVISEDS)
  // * ------------
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

  // * save Mark Product
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

  // * CART
  // * ------------
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

  // * ORDERS
  // * ------------
  // * get ORDERS
  async getOrders(page = "1"): Promise<IResponseOrder> {
    const paramsObj: { [key: string]: string } = {
      "pagination[page]": page,
      "pagination[pageSize]": this.countReviewsOnPage,
    };
    const params = new URLSearchParams(paramsObj);
    const url = `${this.baseUrl}${BACKEND_ROUTES.ORDERS}?${params}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: [],
    } as IResponseOrder;

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
      const response = (await res.json()) as IResponseOrder;
      response.code = res.status;

      return response;
    } catch {
      return result;
    }
  }

  // * get ONE ORDERS
  async getOneOrder(orderId: number): Promise<IResponseOrder> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.ORDERS}/${orderId}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: [],
    } as IResponseOrder;

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
      const response = (await res.json()) as IResponseOrder;
      response.code = res.status;

      return response;
    } catch {
      return result;
    }
  }

  // * Create ORDER
  async createOrder(order: IOrderFromCreate): Promise<IResponseCreateOrder> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.ORDERS}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: null,
    } as IResponseCreateOrder;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
        },
        body: JSON.stringify(order),
        next: { tags: [TAGS_DATA.ORDERS] },
      });

      result.code = res.status;

      if (!res.ok) {
        return result;
      }

      const response = (await res.json()) as IResponseCreateOrder;
      response.code = res.status;

      return response;
    } catch {
      return result;
    }
  }

  // * Update ORDER
  async updateOrder(
    id: number,
    order: IOrderFromCreate
  ): Promise<IResponseCreateOrder> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.ORDERS}/${id}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: null,
    } as IResponseCreateOrder;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          Authorization: Authorization,
        },
        body: JSON.stringify(order),
      });

      result.code = res.status;

      if (!res.ok) {
        return result;
      }

      const response = (await res.json()) as IResponseCreateOrder;
      response.code = res.status;

      return response;
    } catch {
      return result;
    }
  }

  // * Delete ORDER
  async deleteOrder(orderId: number): Promise<IResponseCreateOrder> {
    const url = `${this.baseUrl}${BACKEND_ROUTES.ORDERS}/${orderId}`;

    const session = await getServerSession(authConfigs);
    const accessToken = session?.user.jwt;
    const Authorization = accessToken ? `Bearer ${accessToken}` : "";

    const result = {
      code: 401,
      data: null,
    } as IResponseCreateOrder;

    try {
      const res = await fetch(url, {
        method: "PUT",
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

      const response = (await res.json()) as IResponseCreateOrder;
      response.code = res.status;

      return response;
    } catch {
      return result;
    }
  }
}

const httpServices = new HttpService();

export default httpServices;
