"use client";
import { FC, useEffect, useState } from "react";
import Reviews from "../Reviews/Reviews";
import { getProductReviews, getUserReviews } from "@/services/serverActionHttp";
import ButtonLoadMore from "../ButtonLoadMore/ButtonLoadMore";
import style from "./ReviewsLoadMore.module.css";
interface IProps {
  owner: {
    isProduct?: boolean;
    id: string;
  };
  isModerator?: boolean;
  isCreateReplyReview?: boolean;
  paginationReviews: IPagination | undefined;
  showReply: boolean;
}
const ReviewsLoadMore: FC<IProps> = ({
  owner,
  paginationReviews,
  isModerator = false,
  isCreateReplyReview = false,
  showReply,
}) => {
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
      <Reviews
        reviews={reviews}
        isModerator={isModerator}
        isCreateReplyReview={isCreateReplyReview}
        showReply={showReply}
      />
      <div className={style.wrapButton}>
        {currentPage < countTotalPage && (
          <ButtonLoadMore
            handleLoadMore={handleLoadMore}
            text="Завантажити ще відгуки"
          />
        )}
      </div>
    </>
  );
};

export default ReviewsLoadMore;
