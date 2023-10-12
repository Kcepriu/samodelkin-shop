import { FC } from "react";
import AddReview from "../AddReview/AddReview";
import Reviews from "../Reviews/Reviews";
import ReviewsLoadMore from "../ReviewsLoadMore/ReviewsLoadMore";
import style from "./ProductAddInfoReviews.module.css";
interface IProps {
  product: IProduct;
  reviews: IReview[] | undefined;
  paginationReviews: IPagination | undefined;
}

const ProductAddInfoReviews: FC<IProps> = ({
  product,
  reviews,
  paginationReviews,
}) => {
  return (
    <div className={style.wrapSection}>
      <AddReview product={product} />
      <div className={style.wrapReviews}>
        {reviews && reviews.length > 0 && (
          <>
            <Reviews reviews={reviews} />
            <ReviewsLoadMore
              product={product}
              paginationReviews={paginationReviews}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductAddInfoReviews;
