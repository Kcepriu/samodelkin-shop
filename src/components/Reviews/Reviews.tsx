import { FC } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import RatingStar from "./RatingStar/RatingStar";
import RepliesReviews from "./RepliesReviews/RepliesReviews";
import AddReplyToReview from "../AddReplyToReview/AddReplyToReview";
import ImgNoImage from "@/assets/no_images.png";
import imgPerson from "@/assets/icons/person.svg";
import style from "./Reviews.module.css";
interface IProps {
  reviews: IReview[];
}

const Reviews: FC<IProps> = ({ reviews }) => {
  return (
    <div className={style.wrapSection}>
      {reviews.map((review) => {
        const { id, attributes } = review;
        const repliesReview = attributes.replyReview;
        const product = attributes.product.data;
        console.log("product.attributes.images", product.attributes.images);

        const urlImage = product.attributes.images?.data
          ? product.attributes.images?.data[0].attributes.url
          : ImgNoImage;

        const urlProduct = `${FRONTEND_ROUTES.PRODUCT}/${product.attributes.slug}`;
        return (
          <div key={id} className={style.wrapReview}>
            {/* <p key={id}>TEST 1</p> */}
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

                <p className={style.userName}>
                  {`${attributes.firstName} ${attributes.lastName}`}
                </p>

                <p>{format(new Date(attributes.date), "dd-MM-yyyy")}</p>
              </div>

              <div className={style.wrapContent}>
                <RatingStar rating={attributes.rating} />

                <p className={style.content}>{attributes.content}</p>

                <p>
                  <span className={style.titleField}>Переваги:</span>&nbsp;
                  {attributes.advantages}
                </p>

                <p>
                  <span className={style.titleField}>Недоліки:</span>&nbsp;
                  {attributes.disAdvantages}
                </p>

                <p>
                  <span className={style.titleField}>Статус:</span>&nbsp;
                  {String(attributes.isPublication)}
                </p>
                <div>
                  <AddReplyToReview reviewsId={id} />
                </div>
              </div>

              <div className={style.wrapProduct}>
                <Link href={urlProduct}>
                  <Image
                    className={style.image}
                    src={urlImage}
                    alt={product.attributes.title}
                    height={187}
                    width={219}
                  />
                </Link>
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
