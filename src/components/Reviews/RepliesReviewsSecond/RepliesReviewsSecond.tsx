"use client";

import { FC, useState } from "react";
import ReplyReviews from "../ReplyReviews/ReplyReviews";
import ButtonLoadMore from "@/components/ButtonLoadMore/ButtonLoadMore";
import style from "./RepliesReviewsSecond.module.css";

interface IProps {
  repliesReview: IReplyReview[];
  reviewId: number;
}

const RepliesReviewsSecond: FC<IProps> = ({ repliesReview, reviewId }) => {
  const [show, setShow] = useState(false);

  const handleShowHide = () => {
    setShow((prev) => !prev);
  };
  return (
    <div className={style.wrapSection}>
      <ButtonLoadMore
        handleLoadMore={handleShowHide}
        text={show ? "Приховати" : "Показати більше"}
      />

      {show && (
        <>
          {repliesReview.map((reply) => {
            return (
              <ReplyReviews
                key={reply.id}
                replyReview={reply}
                reviewId={reviewId}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default RepliesReviewsSecond;
