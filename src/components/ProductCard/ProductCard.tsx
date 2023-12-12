import { FC } from "react";
import Image from "next/image";
import Img from "@/assets/no_images.png";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import ButtonAddProductToCart from "../ButtonAddProductToCart/ButtonAddProductToCart";
import FlagLanguages from "../FlagLanguages/FlagLanguages";
import ButtonAddProductToFavorite from "../ButtonAddProductToFavorite/ButtonAddProductToFavorite";
import { formatPrice } from "@/helpers/formatNumber";
import styles from "./ProductCard.module.css";

interface IProps {
  product: IProduct;
}

const ProductCard: FC<IProps> = ({ product }) => {
  const { attributes } = product;
  const images = attributes.images?.data;

  const urlImage = images ? images[0].attributes.url : Img;

  return (
    <div className={styles.wrapCard}>
      <div className={styles.card} key={product.id}>
        <div className={styles.addFavorite}>
          <ButtonAddProductToFavorite
            product={product}
            size={48}
            sizeIcon={24}
          />
        </div>
        <div className={styles.wrapTop}>
          <Link href={`${FRONTEND_ROUTES.PRODUCT}/${attributes.slug}`}>
            <div className={styles.wrapImage}>
              <Image
                className={styles.image}
                src={urlImage}
                alt={attributes.title}
                height={0}
                width={0}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 100vw"
              />
            </div>
          </Link>
          <div className={styles.wrapFlag}>
            <FlagLanguages flags={attributes.languages} />
          </div>
        </div>
        <div className={styles.wrapBottom}>
          <Link href={`${FRONTEND_ROUTES.PRODUCT}/${attributes.slug}`}>
            <h2 className={styles.title}>{attributes.title}</h2>
          </Link>

          <div>
            {!!attributes.available ? (
              <p className={styles.isAvailable}>В наявності</p>
            ) : (
              <p className={styles.isNoAvailable}>Немає в наявності</p>
            )}

            <p className={styles.typeProduct}>Код: {attributes.code}</p>

            <div className={styles.wrapPrice}>
              <p className={styles.price}>
                Ціна {formatPrice(attributes.price)} ₴
              </p>

              <ButtonAddProductToCart product={product} />
            </div>
          </div>
        </div>

        {/* <div className={styles.appearInformation}>
          <p>{attributes.descrition}</p>
          <p>Код товару: {attributes.code}</p>
          <p>Ціна: {attributes.price} ₴.</p>
          <p>Кількість гравців: {attributes.countPlayers}</p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
