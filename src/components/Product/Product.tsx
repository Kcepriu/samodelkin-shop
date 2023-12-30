import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiChatText, PiTruck } from "react-icons/pi";
import { HiOutlineIdentification } from "react-icons/hi2";
import SliderInCard from "../SliderInCard/SliderInCard";
import ButtonAddProductToCart from "../ButtonAddProductToCart/ButtonAddProductToCart";
import ButtonAddProductToFavorite from "../ButtonAddProductToFavorite/ButtonAddProductToFavorite";
import RatingStar from "../Reviews/RatingStar/RatingStar";
import FlagLanguages from "../FlagLanguages/FlagLanguages";
import AddToRevised from "./AddToRevised/AddToRevised";
import ButtonsTypeProduct from "./ButtonsTypeProduct/ButtonsTypeProduct";
import ImgNoImage from "@/assets/no_images.png";
import { formatPrice } from "@/helpers/formatNumber";
import {
  FRONTEND_ROUTES,
  PRODUCT_ADD_INFORMATION_ROUTES,
} from "@/constants/app-keys.const";
import style from "./Product.module.css";

interface IProps {
  product: IProduct;
  rating: number;
  countReview: number;
}

const Product: FC<IProps> = ({ product, rating, countReview }) => {
  const { attributes } = product;
  const images = attributes.images?.data;

  return (
    <>
      <AddToRevised product={product} />
      <div className={style.wrapInformation}>
        <div className={style.wrapImage}>
          {!images && (
            <Image
              className={style.image}
              src={ImgNoImage}
              height={500}
              width={500}
              alt="No image"
            />
          )}
          {images && images.length === 1 && (
            <Image
              className={style.image}
              src={images[0].attributes.url}
              alt={attributes.title}
              height={500}
              width={500}
            />
          )}
          {images && images.length > 1 && (
            <SliderInCard title={attributes.title} images={images} />
          )}
        </div>

        <div className={style.wrapProductInformation}>
          <h1 className={style.title}>{attributes.title}</h1>

          <div className={style.wrapRatingCode}>
            <div className={style.wrapRating}>
              {rating > 0 && <RatingStar rating={rating} />}

              <Link
                className={style.countReviews}
                href={`${FRONTEND_ROUTES.PRODUCT}/${attributes.slug}${PRODUCT_ADD_INFORMATION_ROUTES.REVIEWS}`}
              >
                <PiChatText size={24} />
                {countReview}
              </Link>
            </div>
            <p>
              code: <span>{attributes.code}</span>
            </p>
          </div>

          <div className={style.wrapTypeProduct}>
            <ButtonsTypeProduct product={product} />
          </div>

          <div className={style.wrapLanguages}>
            <FlagLanguages flags={attributes.languages} />
          </div>

          <p className={style.price}>
            {formatPrice(attributes.price)}
            <span className={style.currency}>₴</span>
          </p>

          <div className={style.wrapAvailable}>
            {!!attributes.available ? (
              <p className={style.isAvailable}>В наявності</p>
            ) : (
              <p>Немає в наявності</p>
            )}
          </div>

          <div className={style.wrapButton}>
            <div className={style.buttonCart}>
              <ButtonAddProductToCart product={product} bigButton />
            </div>

            <ButtonAddProductToFavorite product={product} size={24} />
          </div>

          <div className={style.wrapGeneralInformation}>
            <div className={style.generalInformation}>
              <PiTruck size={24} />
              <p>Доставка новою поштою, укр поштою</p>
            </div>
            <div className={style.generalInformation}>
              <HiOutlineIdentification size={24} />
              <p>
                Оплачуйте покупку готівкою у відділені пошти, карткою або
                перерахунком на банківські реквізити
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
