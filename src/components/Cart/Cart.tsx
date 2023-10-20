"use client";

import { FC } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import ProductInCart from "./ProductInCart/ProductInCart";

import style from "./Cart.module.css";
interface IProps {
  onClose: () => void;
}
const Cart: FC<IProps> = ({ onClose }) => {
  const cart = useStore(useCart, (state) => state.products) || [];
  const cleanCart = useCart((state) => state.cleanCart);

  const totalSum =
    cart?.reduce((totalSum, product) => totalSum + product.sum, 0) || 0;

  return (
    <div className={style.wrapCart}>
      <h2 className={style.title}>Кошик</h2>

      <button type="button" onClick={async () => cleanCart()}>
        Clean cart
      </button>

      <ul className={style.wrapProduct}>
        {cart.map((rowCart) => {
          return (
            <li key={rowCart.id}>
              <ProductInCart rowCart={rowCart} />
            </li>
          );
        })}
      </ul>

      <div className={style.wrapTotalSum}>
        <p>{`До сплати ${totalSum} грн`}</p>
      </div>

      <div className={style.wrapButton}>
        <button className={style.buttonBack} type="button" onClick={onClose}>
          <IoArrowBackCircleOutline className={style.iconBack} size={24} />
          Повернутися до покупок
        </button>

        <button className={style.buttonAccept} type="button">
          Оформити замовлення
        </button>
      </div>
    </div>
  );
};

export default Cart;
