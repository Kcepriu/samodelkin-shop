import { FC } from "react";
import { format } from "date-fns";
import Image from "next/image";

import Logo from "@/assets/logo.png";

import style from "./ReplyReviews.module.css";

interface IProps {
  replyReview: IReplyReview;
  reviewId: number;
}
const ReplyReviews: FC<IProps> = ({ replyReview, reviewId }) => {
  return (
    <div className={style.reply}>
      <div className={style.wrapUser}>
        <div className={style.wrapImgPerson}>
          <Image
            className={style.image}
            src={Logo}
            alt="person"
            height={80}
            width={80}
          />
        </div>

        <p className={style.userName}>
          {`${replyReview.firstName} ${replyReview.lastName}`}
        </p>

        <p className={style.data}>
          {format(new Date(replyReview.date), "dd-MM-yyyy")}
        </p>
      </div>
      <div>
        <p className={style.content}>{replyReview.content}</p>
      </div>
    </div>
  );
};

export default ReplyReviews;
