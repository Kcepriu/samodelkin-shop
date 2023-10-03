import { FC } from "react";
import Image from "next/image";
import Img from "@/assets/no_images.png";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import ButtonsCardProduct from "../ButtonsCardProduct/ButtonsCardProduct";
import styles from "./ProductCard.module.css";

interface IProps {
  product: IProduct;
}

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/k8OwAAAABJRU5ErkJggg==`;

const ProductCard: FC<IProps> = ({ product }) => {
  const { attributes } = product;
  const images = attributes.images?.data;

  const urlImage = images ? images[0].attributes.url : Img;

  return (
    <div className={styles.wrapCard}>
      <div className={styles.card} key={product.id}>
        <Link href={`${FRONTEND_ROUTES.PRODUCT}/${attributes.slug}`}>
          <Image
            className={styles.image}
            src={urlImage}
            alt={attributes.title}
            height={0}
            width={0}
            placeholder="blur"
            blurDataURL={rgbDataURL(19, 41, 177)}
            // priority={true}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 100vw"
          />
          <h2 className={styles.title}>{attributes.title}</h2>
        </Link>

        <div className={styles.information}>
          <p>Код товару: {attributes.code}</p>
          <p>Ціна: {attributes.price} грн.</p>
          <p>Кількість гравців: {attributes.countPlayers}</p>
        </div>

        <ButtonsCardProduct product={product} />

        <div className={styles.appearInformation}>
          <p>{attributes.descrition}</p>
          <p>Код товару: {attributes.code}</p>
          <p>Ціна: {attributes.price} грн.</p>
          <p>Кількість гравців: {attributes.countPlayers}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
