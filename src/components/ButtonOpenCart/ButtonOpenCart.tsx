"use client";
import { FC } from "react";
import { BsCart3 } from "react-icons/bs";
import IconWithCount from "../IconWithCount/IconWithCount";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import useCartComponent from "@/hooks/useCartComponent";

import style from "./ButtonOpenCart.module.css";

const ButtonOpenCart: FC = () => {
  const cart = useStore(useCart, (state) => state.products);
  const { CartComponent, setShowModal } = useCartComponent();

  const handleOpenCart = () => {
    if (cart?.length) {
      setShowModal(true);
    } else {
      // TODO Показати модалку що корзина породжня
    }
  };

  return (
    <>
      <button type="button" onClick={handleOpenCart}>
        <IconWithCount
          Icon={BsCart3}
          sizeIcon={32}
          className={style.icon}
          count={cart?.length || 0}
        />
      </button>
      {CartComponent}
    </>
  );
};

export default ButtonOpenCart;
