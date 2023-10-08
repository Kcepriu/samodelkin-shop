"use client";

export const createProductReviews = async (
  review: ICreateReview
): Promise<IResponseOneReviews | null> => {
  const url = "/api/reviews";

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
};
