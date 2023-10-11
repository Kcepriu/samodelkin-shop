import { FC } from "react";
import { format } from "date-fns";

import style from "./ReplyReviews.module.css";

interface IProps {
  replyReview: IReplyReview;
  reviewId: number;
}
const ReplyReviews: FC<IProps> = ({ replyReview, reviewId }) => {
  return (
    <div className={style.reply}>
      <div className={style.wrapUser}>
        <p className={style.userName}>
          {`${replyReview.firstName} ${replyReview.lastName}`}
        </p>

        <p>{format(new Date(replyReview.date), "dd-MM-yyyy")}</p>
      </div>
      <div>
        <p className={style.content}>{replyReview.content}</p>
        <p className={style.content}>
          <span>Status:</span>&nbsp;
          {String(replyReview.isPublication)}
        </p>
      </div>
    </div>
  );
};

export default ReplyReviews;
