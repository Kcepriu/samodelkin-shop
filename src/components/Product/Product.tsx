import { FC } from "react";
import NavigateToBack from "../NavigateToBack/NavigateToBack";
import SliderInCard from "../SliderInCard/SliderInCard";
import Image from "next/image";
import ImgNoImage from "@/assets/no_images.png";
import ButtonAddProductToCart from "../ButtonAddProductToCart/ButtonAddProductToCart";
import ButtonAddProductToFavorite from "../ButtonAddProductToFavorite/ButtonAddProductToFavorite";
import style from "./Product.module.css";

interface IProps {
  product: IProduct;
}

const Product: FC<IProps> = ({ product }) => {
  const { attributes } = product;

  const images = attributes.images?.data;

  return (
    <>
      <NavigateToBack />
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
          <p>
            code: <span>{attributes.code}</span>
          </p>
          <p>
            countPlayers: <span>{attributes.countPlayers}</span>
          </p>
          <p>
            price: <span>{attributes.price}</span>
          </p>
          <p>
            available: <span>{attributes.available}</span>
          </p>

          <div>
            <ButtonAddProductToCart product={product} />
            <ButtonAddProductToFavorite product={product} size={24} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
