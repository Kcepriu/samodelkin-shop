import { FC } from "react";
import ButtonsAddReview from "../ButtonsAddReview/ButtonsAddReview";
import Reviews from "../Reviews/Reviews";
import style from "./ProductAddInfoReviews.module.css";
interface IProps {
  product: IProduct;
  reviews: IReview[] | undefined;
}

const ProductAddInfoReviews: FC<IProps> = ({ product, reviews }) => {
  return (
    <div className={style.wrapSection}>
      <ButtonsAddReview product={product} />
      <div className={style.wrapReviews}></div>
      {reviews && reviews.length > 0 && <Reviews reviews={reviews} />}
    </div>
  );
};

export default ProductAddInfoReviews;
