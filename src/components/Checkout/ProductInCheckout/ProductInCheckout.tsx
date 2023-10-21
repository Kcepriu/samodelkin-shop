import { FC } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Img from "@/assets/no_images.png";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import CountProductChange from "@/components/CountProductChange/CountProductChange";
import { RiDeleteBin2Line } from "react-icons/ri";
import style from "./ProductInCheckout.module.css";

interface IProps {
  rowCart: ICartRow;
  deleteProduct: (product: IProduct) => void;
}
const ProductInCheckout: FC<IProps> = ({ rowCart, deleteProduct }) => {
  const router = useRouter();
  const { product } = rowCart;
  const attributes = product.attributes;
  const images = attributes.images?.data;
  const urlImage = images ? images[0].attributes.url : Img;

  const handleToProduct = () => {
    router.push(`${FRONTEND_ROUTES.PRODUCT}/${attributes.slug}`);
  };

  return (
    <div className={style.wrapProduct}>
      <div className={style.wrapImage}>
        <button type="button" onClick={handleToProduct}>
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
            <h2 className={style.title}> {product.attributes.title}</h2>
          </button>

          <button
            className={style.buttonDelete}
            type="button"
            onClick={async () => await deleteProduct(product)}
          >
            <RiDeleteBin2Line className={style.icon} size={18} />
          </button>
        </div>

        <div className={style.wrapDetails}>
          <CountProductChange rowCart={rowCart} />
          <p className={style.totalSum}>{rowCart.sum} грн</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInCheckout;
