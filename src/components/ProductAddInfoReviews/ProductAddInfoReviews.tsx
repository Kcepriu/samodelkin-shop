import { FC } from "react";
import ButtonsAddReview from "../ButtonsAddReview/ButtonsAddReview";
import style from "./ProductAddInfoReviews.module.css";
interface IProps {
  product: IProduct;
}

const ProductAddInfoReviews: FC<IProps> = ({ product }) => {
  return (
    <div className={style.wrapSection}>
      <ButtonsAddReview product={product} />
      <p>Reviews</p>
    </div>
  );
};

export default ProductAddInfoReviews;
