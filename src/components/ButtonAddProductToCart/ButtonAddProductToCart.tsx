"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Cart from "../Cart/Cart";
import { Modal } from "../Modal/Modal";
import { BsCart3 } from "react-icons/bs";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";

import style from "./ButtonAddProductToCart.module.css";

interface IProps {
  product: IProduct;
}
const ButtonAddProductToCart: FC<IProps> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const cart = useStore(useCart, (state) => state.products);
  const addOneProductToCart = useCart((state) => state.addOneProductToCart);

  const isInCart =
    cart?.some((element) => element.product.data.id === product.id) || false;

  const handleAddToCart = async () => {
    if (!isInCart) {
      await addOneProductToCart(product);
      setShowModal(true);
      return;
    }
    router.push(FRONTEND_ROUTES.CHECKOUT);
  };

  const handlerCloseCart = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={style.wrapButtom}>
        <button type="button" onClick={handleAddToCart}>
          <BsCart3 size={32} className={style.icon} data-in-cart={isInCart} />
        </button>
      </div>

      {showModal && (
        <Modal onClose={handlerCloseCart}>
          <Cart onClose={handlerCloseCart} />
        </Modal>
      )}
    </>
  );
};

export default ButtonAddProductToCart;
