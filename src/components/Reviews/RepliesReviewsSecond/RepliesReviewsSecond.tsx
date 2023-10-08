"use client";

import { FC, useState } from "react";
import ReplyReviews from "../ReplyReviews/ReplyReviews";
import style from "./RepliesReviewsSecond.module.css";

interface IProps {
  repliesReview: IReplyReview[];
}

const RepliesReviewsSecond: FC<IProps> = ({ repliesReview }) => {
  const [show, setShow] = useState(false);

  const handleShowHide = () => {
    setShow((prev) => !prev);
  };
  return (
    <div className={style.wrapSection}>
      <button
        type="button"
        onClick={handleShowHide}
        className={style.buttonShowHide}
      >
        {show ? "Приховати" : "Показати більше"}
      </button>

      {show && (
        <>
          {repliesReview.map((reply) => {
            return <ReplyReviews key={reply.id} replyReview={reply} />;
          })}{" "}
        </>
      )}
    </div>
  );
};

export default RepliesReviewsSecond;
