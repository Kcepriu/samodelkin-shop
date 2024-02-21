import { FC } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import ImgNoImage from "@/assets/no_images.png";
import imgPerson from "@/assets/icons/person.svg";
import RatingStar from "../RatingStar/RatingStar";
import RepliesReviews from "../RepliesReviews/RepliesReviews";
import ButtonsReview from "../ButtonsReview/ButtonsReview";
import ButtonDeleteReview from "../ButtonDeleteReview/ButtonDeleteReview";

import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import style from "./ReviewOne.module.css";

interface IProps {
  review: IReview;
  isModerator: boolean;
  isCreateReplyReview: boolean;
  showReply: boolean;
}
const ReviewOne: FC<IProps> = ({
  review,
  isModerator,
  isCreateReplyReview,
  showReply,
}) => {
  const { id, attributes } = review;
  const repliesReview = attributes.replyReview;
  const product = attributes.product.data;

  if (!product) return <></>;

  const urlImage = product.attributes.images?.data
    ? product.attributes.images?.data[0].attributes.url
    : ImgNoImage;

  const urlProduct = `${FRONTEND_ROUTES.PRODUCT}/${product.attributes.slug}`;
  return (
    <div className={style.wrapReview}>
      <div className={style.wrapReviewWithReply}>
        {/* User Plus Title on mobile */}
        <div className={style.wrapHeader}>
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

            <p className={style.userName}>
              {`${attributes.firstName || ""} ${attributes.lastName || ""}`}
            </p>

            <p className={style.data}>
              {format(new Date(attributes.date), "dd-MM-yyyy")}
            </p>
          </div>

          <div className={style.wrapTitleMobile}>
            <h3 className={style.titleProduct}>{product.attributes.title}</h3>
            <div className={style.wrapRating}>
              <RatingStar rating={attributes.rating} />
            </div>
          </div>
        </div>

        {/* All Content */}
        <div className={style.wrapContentWithModerator}>
          <div className={style.wrapContentWithImage}>
            <div className={style.wrapContent}>
              {/* Title on desktop */}
              <div className={style.wrapTitleDesktop}>
                <h3 className={style.titleProduct}>
                  {product.attributes.title}
                </h3>
                <div className={style.wrapRating}>
                  <RatingStar rating={attributes.rating} />
                </div>
              </div>

              <p className={style.content}>{attributes.content}</p>

              {/* <div className={style.wrapAdvantages}>
                <p className={style.titleField}>Переваги:</p>
                <p className={style.advantagesDisAdvantages}>
                  {attributes.advantages}
                </p>
              </div>

              <div className={style.wrapAdvantages}>
                <p className={style.titleField}>Недоліки:</p>
                <p className={style.advantagesDisAdvantages}>
                  {attributes.disAdvantages}
                </p>
              </div> */}
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

          <div className={style.wrapAdvantages}>
            <p className={style.titleField}>Переваги:</p>
            <p className={style.advantagesDisAdvantages}>
              {attributes.advantages}
            </p>
          </div>

          <div className={style.wrapAdvantages}>
            <p className={style.titleField}>Недоліки:</p>
            <p className={style.advantagesDisAdvantages}>
              {attributes.disAdvantages}
            </p>
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
      {showReply && repliesReview.length > 0 && (
        <RepliesReviews reviewId={id} repliesReview={[repliesReview[0]]} />
      )}
    </div>
  );
};

export default ReviewOne;
