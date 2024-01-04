import { FC } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import RatingStar from "./RatingStar/RatingStar";
import RepliesReviews from "./RepliesReviews/RepliesReviews";
import ImgNoImage from "@/assets/no_images.png";
import imgPerson from "@/assets/icons/person.svg";
import ButtonsReview from "./ButtonsReview/ButtonsReview";
import ButtonDeleteReview from "./ButtonDeleteReview/ButtonDeleteReview";

import style from "./Reviews.module.css";
interface IProps {
  reviews: IReview[];
  isModerator?: boolean;
  isCreateReplyReview?: boolean;
}

const Reviews: FC<IProps> = ({
  reviews,
  isModerator = true,
  isCreateReplyReview = true,
}) => {
  return (
    <div className={style.wrapSection}>
      {reviews.map((review) => {
        const { id, attributes } = review;
        const repliesReview = attributes.replyReview;
        const product = attributes.product.data;

        const urlImage = product.attributes.images?.data
          ? product.attributes.images?.data[0].attributes.url
          : ImgNoImage;

        const urlProduct = `${FRONTEND_ROUTES.PRODUCT}/${product.attributes.slug}`;
        return (
          <div key={id} className={style.wrapReview}>
            <div className={style.wrapReviewWithReply}>
              <div className={style.wrapUser}>
                <div className={style.wrapImgPerson}>
                  <Image
                    className={style.image}
                    src={imgPerson}
                    alt="person"
                    height={80}
                    width={80}
                  />
                </div>

                <div>
                  <div className={style.wrapRatingMobile}>
                    <RatingStar rating={attributes.rating} />
                  </div>

                  <p className={style.userName}>
                    {`${attributes.firstName} ${attributes.lastName}`}
                  </p>

                  <p className={style.data}>
                    {format(new Date(attributes.date), "dd-MM-yyyy")}
                  </p>
                </div>
              </div>

              <div className={style.wrapContentWithModerator}>
                <div className={style.wrapContentWithImage}>
                  <div className={style.wrapContent}>
                    <div className={style.wrapRatingDesktop}>
                      <RatingStar rating={attributes.rating} />
                    </div>

                    <p className={style.content}>{attributes.content}</p>
                    <p>
                      <span className={style.titleField}>Переваги:</span>&nbsp;
                      {attributes.advantages}
                    </p>
                    <p>
                      <span className={style.titleField}>Недоліки:</span>&nbsp;
                      {attributes.disAdvantages}
                    </p>
                  </div>

                  <div className={style.wrapProduct}>
                    <Link href={urlProduct}>
                      <Image
                        className={style.imageProduct}
                        src={urlImage}
                        alt={product.attributes.title}
                        width={0}
                        height={0}
                        sizes="(max-width: 1140px) 13vw, (max-width: 768px) 25vw,  25vw"
                      />
                    </Link>
                  </div>
                  {isModerator && (
                    <div className={style.buttonDelete}>
                      <ButtonDeleteReview idReview={id} />
                    </div>
                  )}
                </div>
                {(isModerator || isCreateReplyReview) && (
                  <ButtonsReview
                    review={review}
                    isModerator={isModerator}
                    isCreateReplyReview={isCreateReplyReview}
                  />
                )}
              </div>
            </div>
            {repliesReview.length > 0 && (
              <RepliesReviews reviewId={id} repliesReview={repliesReview} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
