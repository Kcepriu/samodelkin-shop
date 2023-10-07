import { FC } from "react";
import { format } from "date-fns";
import style from "./ReplyReviews.module.css";

interface IProps {
  replyReview: IReplyReview;
}
const ReplyReviews: FC<IProps> = ({ replyReview }) => {
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
      </div>
    </div>
  );
};

export default ReplyReviews;
