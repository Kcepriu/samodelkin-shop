import { FC } from "react";
import ReplyReviews from "../ReplyReviews/ReplyReviews";
import RepliesReviewsSecond from "../RepliesReviewsSecond/RepliesReviewsSecond";
import style from "./RepliesReviews.module.css";

interface IProps {
  repliesReview: IReplyReview[];
  countShow?: number;
}
const RepliesReviews: FC<IProps> = ({ repliesReview, countShow = 1 }) => {
  const replyShowFirst = repliesReview.slice(0, countShow);
  const replyShowSecond = repliesReview.slice(countShow);

  return (
    <div className={style.wrapReplies}>
      {replyShowFirst.map((reply) => {
        return <ReplyReviews key={reply.id} replyReview={reply} />;
      })}
      {replyShowSecond.length > 0 && (
        <RepliesReviewsSecond repliesReview={replyShowSecond} />
      )}
    </div>
  );
};

export default RepliesReviews;
