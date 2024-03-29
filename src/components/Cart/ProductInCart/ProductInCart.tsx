import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { PiTrash } from "react-icons/pi";

import Img from "@/assets/no_images.png";
import ChangeLanguage from "@/components/ChangeLanguage/ChangeLanguage";
import ChangeLanguageSelect from "@/components/ChangeLanguageSelect/ChangeLanguageSelect";
import CountProductChange from "@/components/CountProductChange/CountProductChange";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import { formatPrice } from "@/helpers/formatNumber";
import style from "./ProductInCart.module.css";

interface IProps {
  rowCart: ICartRow;
  onClose: () => void;
  deleteProduct: (product: IProduct) => void;
}
const ProductInCart: FC<IProps> = ({ rowCart, onClose, deleteProduct }) => {
  const router = useRouter();
  const { product } = rowCart;
  const attributes = product.data?.attributes;

  if (!attributes) return <></>;

  const countLanguages = attributes?.languages.length || 0;

  const images = attributes.images?.data;
  const urlImage = images ? images[0].attributes.url : Img;

  const handleToProduct = () => {
    router.push(`${FRONTEND_ROUTES.PRODUCT}/${attributes.slug}`);
    onClose();
  };

  return (
    <>
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
              <div className={style.wrapDetails}>
                <div className={style.wrapPrice}>
                  <p>Ціна: {formatPrice(rowCart.price)} ₴</p>

                  <CountProductChange rowCart={rowCart} />

                  <p className={style.totalSum}>{formatPrice(rowCart.sum)} ₴</p>
                </div>

                <button
                  className={style.buttonDelete}
                  type="button"
                  onClick={async () => await deleteProduct(product.data)}
                >
                  <PiTrash className={style.icon} size={24} />
                </button>
              </div>

              <div className={style.wrapInformationMobile}>
                <p>Ціна: {formatPrice(rowCart.price)} ₴</p>
              </div>

              <div className={style.wrapChangeLanguage}>
                {countLanguages > 1 ? (
                  <ChangeLanguageSelect rowCart={rowCart} />
                ) : (
                  <ChangeLanguage rowCart={rowCart} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={style.wrapCountProductMobile}>
          <CountProductChange rowCart={rowCart} />
          <p className={style.totalSum}>{formatPrice(rowCart.sum)} ₴</p>
          <button
            className={style.buttonDelete}
            type="button"
            onClick={async () => await deleteProduct(product.data)}
          >
            <PiTrash className={style.icon} size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductInCart;
