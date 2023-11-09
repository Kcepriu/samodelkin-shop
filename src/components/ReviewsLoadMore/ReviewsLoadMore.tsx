"use client";
import { FC, useEffect, useState } from "react";
import Reviews from "../Reviews/Reviews";
import { getProductReviews, getUserReviews } from "@/services/serverActionHttp";

interface IProps {
  owner: {
    isProduct?: boolean;
    id: string;
  };
  paginationReviews: IPagination | undefined;
}
const ReviewsLoadMore: FC<IProps> = ({ owner, paginationReviews }) => {
  const countTotalPage = paginationReviews?.pageCount || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;

    const newReviews = owner?.isProduct
      ? await getProductReviews(owner.id, String(nextPage))
      : await getUserReviews(owner.id, String(nextPage));
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
