import { FC } from "react";
import httpServices from "@/services/http";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";

import Reviews from "@/components/Reviews/Reviews";
import ReviewsLoadMore from "@/components/ReviewsLoadMore/ReviewsLoadMore";

import style from "./AccountPageReviews.module.css";

const AccountPageReviews: FC = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;
  const userId = user?.id || "";

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
