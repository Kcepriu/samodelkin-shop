import { FC } from "react";
import style from "./Reviews.module.css";
interface IProps {
  reviews: IReview[];
}

const Reviews: FC<IProps> = ({ reviews }) => {
  return (
    <div className={style.wrapSection}>
      {reviews.map(({ id, attributes }) => {
        return (
          <div key={id} className={style.wrapReview}>
            <div>
              <p>{attributes.date}</p>
              <p>
                {attributes.firstName}&nbsp;
                {attributes.lastName}
              </p>
            </div>
            <div className={style.wrapContent}>
              <p>{attributes.rating}</p>
              <p>{attributes.content}</p>
              <p>{attributes.advantages}</p>
              <p>{attributes.disAdvantages}</p>
            </div>
            <div className={style.wrapProduct}>
              <p>Product</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
