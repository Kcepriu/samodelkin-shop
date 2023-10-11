"use client";
import { BACKEND_ROUTES } from "@/constants/app-keys.const";
class HttpClientService {
  async createProductReviews(
    review: ICreateReview
  ): Promise<IResponseOneReviews | null> {
    const url = BACKEND_ROUTES.REVIEWS;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  async createReplyForReviews(
    reviewsId: string,
    reply: ICreateReply
  ): Promise<IResponseOneReviews | null> {
    const url = `${BACKEND_ROUTES.REPLY_TO_REVIEWS}/${reviewsId}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  async changeStatusReview(
    reviewsId: string,
    review: IChangeStatusReview
  ): Promise<IResponseOneReviews | null> {
    const url = `${BACKEND_ROUTES.CHANGE_STATUS_REVIEWS}/${reviewsId}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  async changeReplyToReview(
    reviewsId: string,
    replyId: string,
    reply: IChangeReplyToReview
  ): Promise<IResponseOneReviews | null> {
    const url = `${BACKEND_ROUTES.CHANGE_REPLY_TO_REVIEWS}/${reviewsId}/${replyId}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
}

const httpClientServices = new HttpClientService();

export default httpClientServices;
