"use client";

import { FC } from "react";
import { FaCartPlus } from "react-icons/fa";
import styles from "./ButtonsCardProduct.module.css";

interface IProps {
  product: IProduct;
}
const ButtonsCardProduct: FC<IProps> = ({ product }) => {
  const handleAddToCart = () => {
    console.log("Add to cart product: ", product.id);
  };

  return (
    <div className={styles.wrapButtom} onClick={handleAddToCart}>
      <button type="button">
        <FaCartPlus size={32} />
      </button>
    </div>
  );
};

export default ButtonsCardProduct;
