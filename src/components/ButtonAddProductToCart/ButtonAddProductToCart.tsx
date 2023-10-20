"use client";

import { FC } from "react";
import { BsCart3 } from "react-icons/bs";
import styles from "./ButtonAddProductToCart.module.css";

interface IProps {
  product: IProduct;
}
const ButtonAddProductToCart: FC<IProps> = ({ product }) => {
  const handleAddToCart = () => {
    console.log("Add to cart product: ", product.id);
  };

  return (
    <div className={styles.wrapButtom} onClick={handleAddToCart}>
      <button type="button">
        <BsCart3 size={32} />
      </button>
    </div>
  );
};

export default ButtonAddProductToCart;
