import { FC } from "react";
import ReplyReviews from "../ReplyReviews/ReplyReviews";
import RepliesReviewsSecond from "../RepliesReviewsSecond/RepliesReviewsSecond";
import style from "./RepliesReviews.module.css";

interface IProps {
  repliesReview: IReplyReview[];
  reviewId: number;
  countShow?: number;
}
const RepliesReviews: FC<IProps> = ({
  repliesReview,
  reviewId,
  countShow = 1,
}) => {
  const replyShowFirst = repliesReview.slice(0, countShow);
  const replyShowSecond = repliesReview.slice(countShow);

  return (
    <div className={style.wrapReplies}>
      {replyShowFirst.map((reply) => {
        return (
          <ReplyReviews
            key={reply.id}
            replyReview={reply}
            reviewId={reviewId}
          />
        );
      })}
      {replyShowSecond.length > 0 && (
        <RepliesReviewsSecond
          repliesReview={replyShowSecond}
          reviewId={reviewId}
        />
      )}
    </div>
  );
};

export default RepliesReviews;
