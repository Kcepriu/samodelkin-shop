"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import ProductInCart from "./ProductInCart/ProductInCart";
import { formatPrice } from "@/helpers/formatNumber";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";

import style from "./Cart.module.css";
interface IProps {
  onClose: () => void;
}
const Cart: FC<IProps> = ({ onClose }) => {
  const router = useRouter();
  const cart = useStore(useCart, (state) => state.products) || [];

  const deleteFromCart = useCart((state) => state.deleteFromCart);

  const totalSum =
    cart?.reduce((totalSum, product) => totalSum + product.sum, 0) || 0;

  const handleMakeOrder = () => {
    router.push(`${FRONTEND_ROUTES.CHECKOUT}`);
    onClose();
  };

  const handleDeleteProduct = async (product: IProduct) => {
    await deleteFromCart(product);
  };

  return (
    <div className={style.wrapCart}>
      <h2 className={style.title}>Кошик</h2>
      <div className={style.wrapTitle}></div>

      <ul className={style.wrapProduct}>
        {cart.map((rowCart) => {
          return (
            <li key={rowCart.id}>
              <ProductInCart
                rowCart={rowCart}
                onClose={onClose}
                deleteProduct={handleDeleteProduct}
              />
            </li>
          );
        })}
      </ul>

      <div className={style.wrapTotalSum}>
        <p>{`До сплати ${formatPrice(totalSum)} ₴`}</p>
      </div>

      <div className={style.wrapButton}>
        <button className={style.buttonBack} type="button" onClick={onClose}>
          <IoArrowBackCircleOutline className={style.iconBack} size={24} />
          Повернутися до покупок
        </button>

        <button
          className={style.buttonAccept}
          type="button"
          onClick={handleMakeOrder}
        >
          Оформити замовлення
        </button>
      </div>
    </div>
  );
};

export default Cart;
