import { FC } from "react";
import httpServices from "@/services/http";
import Reviews from "@/components/Reviews/Reviews";
import ReviewsLoadMore from "@/components/ReviewsLoadMore/ReviewsLoadMore";
import style from "./AccountPageReviews.module.css";

interface IProps {
  userId: string;
}
const AccountPageReviews: FC<IProps> = async ({
  userId,
}): Promise<JSX.Element> => {
  const responseReviews = await httpServices.getUserReviews(userId);
  const reviews = responseReviews?.data;
  const paginationReviews = responseReviews?.meta.pagination;

  return (
    <div className={style.wrapReviews}>
      {reviews && reviews.length > 0 && (
        <>
          <Reviews reviews={reviews} />
          <ReviewsLoadMore
            owner={{ id: userId }}
            paginationReviews={paginationReviews}
          />
        </>
      )}
    </div>
  );
};

export default AccountPageReviews;
