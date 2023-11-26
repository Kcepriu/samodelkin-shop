"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { BsCart3 } from "react-icons/bs";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import Cart from "../Cart/Cart";
import { Modal } from "../Modal/Modal";
import ButtonMain from "../ButtonMain/ButtonMain";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";

import style from "./ButtonAddProductToCart.module.css";

interface IProps {
  product: IProduct;
  bigButton?: boolean;
}
const defaultLanguage = { language: "ua" };

const ButtonAddProductToCart: FC<IProps> = ({ product, bigButton }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const cart = useStore(useCart, (state) => state.products);
  const addOneProductToCart = useCart((state) => state.addOneProductToCart);

  const isInCart =
    cart?.some((element) => element.product.data.id === product.id) || false;

  const handleAddToCart = async () => {
    if (isInCart) {
      setShowModal(true);
      // router.push(FRONTEND_ROUTES.CHECKOUT);
      return;
    }

    await addOneProductToCart(
      product,
      product.attributes?.languages && product.attributes?.languages.length > 0
        ? product.attributes.languages[0]
        : defaultLanguage
    );
    setShowModal(true);
    return;
  };

  const handlerCloseCart = () => {
    setShowModal(false);
  };

  return (
    <>
      {!bigButton && (
        <button type="button" onClick={handleAddToCart}>
          <BsCart3 size={32} className={style.icon} data-in-cart={isInCart} />
        </button>
      )}

      {!!bigButton && (
        <ButtonMain text="Купити" handlerButton={handleAddToCart} />
      )}

      {showModal && (
        <Modal onClose={handlerCloseCart}>
          <Cart onClose={handlerCloseCart} />
        </Modal>
      )}
    </>
  );
};

export default ButtonAddProductToCart;
