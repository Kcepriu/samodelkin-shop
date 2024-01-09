import { FC } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { PiTrash } from "react-icons/pi";
import Img from "@/assets/no_images.png";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import { formatPrice } from "@/helpers/formatNumber";
import { getImageFlag } from "@/helpers/getImageFlag";
import style from "./ProductInCheckout.module.css";

interface IProps {
  rowCart: ICartRow;
  deleteProduct: (product: IProduct) => void;
}
const ProductInCheckout: FC<IProps> = ({ rowCart, deleteProduct }) => {
  const router = useRouter();
  const { product } = rowCart;
  const attributes = product.data.attributes;
  const images = attributes.images?.data;
  const urlImage = images ? images[0].attributes.url : Img;

  const handleToProduct = () => {
    router.push(`${FRONTEND_ROUTES.PRODUCT}/${attributes.slug}`);
  };

  return (
    <div className={style.wrapCardProduct}>
      <div className={style.wrapProduct}>
        <div className={style.wrapImage}>
          <button
            type="button"
            onClick={handleToProduct}
            className={style.buttonImage}
          >
            <Image
              className={style.image}
              src={urlImage}
              alt={attributes.title}
              height={0}
              width={187}
            />
          </button>
        </div>
        <div className={style.wrapContent}>
          <div className={style.wrapTitle}>
            <button type="button" onClick={handleToProduct}>
              <h2 className={style.title}> {attributes.title}</h2>
            </button>
          </div>

          <div className={style.wrapInformation}>
            <div className={style.wrapInformationProduct}>
              <div className={style.wrapDetails}>
                <div>Кількість: {rowCart.count} шт.</div>
                <p className={style.totalSum}>{formatPrice(rowCart.sum)} ₴</p>
                <button
                  className={style.buttonDelete}
                  type="button"
                  onClick={async () => await deleteProduct(product.data)}
                >
                  <PiTrash className={style.icon} size={18} />
                </button>
              </div>

              <div className={style.wrapLanguage}>
                <Image
                  // className={styles.image}
                  src={getImageFlag(rowCart.language.language)}
                  alt={rowCart.language.language}
                  height={25}
                  width={34}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.wrapDetailsMobile}>
        <div className={style.wrapCountMobile}>
          <div>Кількість: {rowCart.count} шт.</div>
          <p className={style.totalSum}>Сума: {formatPrice(rowCart.sum)} ₴</p>
        </div>

        <button
          className={style.buttonDelete}
          type="button"
          onClick={async () => await deleteProduct(product.data)}
        >
          <PiTrash className={style.icon} size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductInCheckout;
