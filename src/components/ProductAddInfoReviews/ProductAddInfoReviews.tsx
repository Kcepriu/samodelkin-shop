import { FC } from "react";
import AddReview from "@/components/AddReview/AddReview";
import Reviews from "@/components/Reviews/Reviews";
import ReviewsLoadMore from "@/components/ReviewsLoadMore/ReviewsLoadMore";
import SliderReviews from "../SliderReviews/SliderReviews";
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
            <div className={style.wrapReviewsSlider}>
              <SliderReviews
                reviews={reviews}
                owner={{ isProduct: true, id: String(product.id) }}
                paginationReviews={paginationReviews}
              />
            </div>
            <div className={style.wrapReviewsDesktop}>
              <Reviews reviews={reviews} showReply={true} />
              <ReviewsLoadMore
                owner={{ isProduct: true, id: String(product.id) }}
                paginationReviews={paginationReviews}
                showReply={true}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductAddInfoReviews;
