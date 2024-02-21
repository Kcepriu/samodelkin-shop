import { FC } from "react";
import ReviewOne from "./ReviewOne/ReviewOne";
import style from "./Reviews.module.css";
interface IProps {
  reviews: IReview[];
  isModerator?: boolean;
  isCreateReplyReview?: boolean;
  showReply: boolean;
}

const Reviews: FC<IProps> = ({
  reviews,
  isModerator = false,
  isCreateReplyReview = false,
  showReply = true,
}) => {
  return (
    <div className={style.wrapSection}>
      {reviews.map((review) => {
        const { id } = review;
        return (
          <ReviewOne
            key={id}
            review={review}
            isModerator={isModerator}
            isCreateReplyReview={isCreateReplyReview}
            showReply={showReply}
          />
        );
      })}
    </div>
  );
};

export default Reviews;
