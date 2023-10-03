import { FC } from "react";
import NavigateToBack from "../NavigateToBack/NavigateToBack";
import style from "./ProductSkeleton.module.css";
import Image from "next/image";
import ImgNoImage from "@/assets/no_images.png";

const ProductSkeleton: FC = () => {
  return (
    <>
      <NavigateToBack />
      <div className={style.wrapInformation}>
        <div className={style.wrapImage}>
          <Image
            className={style.image}
            src={ImgNoImage}
            height={500}
            width={500}
            alt="No image"
            priority
          />
        </div>

        <div className={style.wrapProductInformation}>
          <h1 className={style.title}>Назва товару</h1>
          <p>
            code: <span>Артикул</span>
          </p>
          <p>
            countPlayers: <span>Кількість гравців</span>
          </p>
          <p>
            price: <span>ціна</span>
          </p>
          <p>
            available: <span>Достурність</span>
          </p>
        </div>
      </div>
      <div>
        <p> Additional information</p>
      </div>
    </>
  );
};

export default ProductSkeleton;
