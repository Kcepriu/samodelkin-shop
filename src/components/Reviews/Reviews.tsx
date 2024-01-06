import { FC } from "react";
import ReviewOne from "./ReviewOne/ReviewOne";
import style from "./Reviews.module.css";
interface IProps {
  reviews: IReview[];
  isModerator?: boolean;
  isCreateReplyReview?: boolean;
}

const Reviews: FC<IProps> = ({
  reviews,
  isModerator = false,
  isCreateReplyReview = false,
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
          />
        );
      })}
    </div>
  );
};

export default Reviews;
