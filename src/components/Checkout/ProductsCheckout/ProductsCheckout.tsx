"use client";

import { FC } from "react";
import { GoPencil } from "react-icons/go";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import ProductInCheckout from "../ProductInCheckout/ProductInCheckout";
import useCartComponent from "@/hooks/useCartComponent";
import { getTotalSumCart } from "@/helpers/convertStructuresToBac";
import { formatPrice } from "@/helpers/formatNumber";
import style from "./ProductsCheckout.module.css";

const ProductsCheckout: FC = () => {
  const { CartComponent, setShowModal } = useCartComponent();
  const cart = useStore(useCart, (state) => state.products) || [];
  const deleteFromCart = useCart((state) => state.deleteFromCart);
  const totalSum = getTotalSumCart(cart);

  const handleDeleteProduct = async (product: IProduct) => {
    await deleteFromCart(product);
  };

  return (
    <>
      <div className={style.wrapComponent}>
        <div className={style.wrapTitle}>
          <h2 className={style.title}>Ваше замовлення</h2>

          <button
            className={style.buttonClean}
            type="button"
            onClick={async () => setShowModal(true)}
          >
            <GoPencil className={style.icon} size={24} />
          </button>
        </div>

        <ul className={style.wrapProduct}>
          {cart.map((rowCart) => {
            return (
              <li key={rowCart.id}>
                <ProductInCheckout
                  rowCart={rowCart}
                  deleteProduct={handleDeleteProduct}
                />
              </li>
            );
          })}
        </ul>

        <div className={style.wrapDelivery}>
          <p>Доставка</p>
          <p className={style.textAccent}>За тарифами перевізника</p>
        </div>
        <div className={style.wrapTotal}>
          <p>Всього</p>
          <p className={style.textAccent}>{formatPrice(totalSum)} грн</p>
        </div>
      </div>
      {CartComponent}
    </>
  );
};

export default ProductsCheckout;
