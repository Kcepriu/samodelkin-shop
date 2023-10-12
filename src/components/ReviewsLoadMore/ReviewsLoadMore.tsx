"use client";
import { FC, useEffect, useState } from "react";
import Reviews from "../Reviews/Reviews";
import { getProductReviews } from "@/services/serverActionHttp";

interface IProps {
  product: IProduct;
  paginationReviews: IPagination | undefined;
}
const ReviewsLoadMore: FC<IProps> = ({ product, paginationReviews }) => {
  const countTotalPage = paginationReviews?.pageCount || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    const newReviews = await getProductReviews(
      String(product.id),
      String(nextPage)
    );

    if (newReviews) {
      setReviews((prevReviews: IReview[]) => [
        ...prevReviews,
        ...newReviews?.data,
      ]);
      setCurrentPage(nextPage);
    }
  };

  if (countTotalPage === 1) return null;

  return (
    <>
      <Reviews reviews={reviews} />
      {currentPage < countTotalPage && (
        <button type="button" onClick={handleLoadMore}>
          Завантажити ще відгуки
        </button>
      )}
    </>
  );
};

export default ReviewsLoadMore;
