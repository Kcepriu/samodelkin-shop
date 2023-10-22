import { FC } from "react";
import httpServices from "@/services/http";
import Reviews from "@/components/Reviews/Reviews";
import ReviewsLoadMore from "@/components/ReviewsLoadMore/ReviewsLoadMore";
import style from "./AccountPageReviews.module.css";

interface IProps {
  user: IUser;
}
const AccountPageReviews: FC<IProps> = async ({
  user,
}): Promise<JSX.Element> => {
  const responseReviews = await httpServices.getUserReviews(String(user.id));
  const reviews = responseReviews?.data;
  const paginationReviews = responseReviews?.meta.pagination;

  return (
    <div className={style.wrapReviews}>
      {reviews && reviews.length > 0 && (
        <>
          <Reviews reviews={reviews} />
          <ReviewsLoadMore owner={user} paginationReviews={paginationReviews} />
        </>
      )}
    </div>
  );
};

export default AccountPageReviews;
