import { FC } from "react";
import AddReview from "@/components/AddReview/AddReview";
import Reviews from "@/components/Reviews/Reviews";
import ReviewsLoadMore from "@/components/ReviewsLoadMore/ReviewsLoadMore";
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
              owner={product}
              paginationReviews={paginationReviews}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductAddInfoReviews;
