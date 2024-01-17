"use client";
import { FC } from "react";
import { BsCart3 } from "react-icons/bs";
import IconWithCount from "../IconWithCount/IconWithCount";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import useCartComponent from "@/hooks/useCartComponent";
import useModalMessage from "@/hooks/useModalMessage";

import style from "./ButtonOpenCart.module.css";

const ButtonOpenCart: FC = () => {
  const {
    MessageComponent,
    setShowModal: setShowModalMessage,
    setTextMessage,
  } = useModalMessage();
  const cart = useStore(useCart, (state) => state.products);
  const { CartComponent, setShowModal } = useCartComponent();

  const handleOpenCart = () => {
    if (cart?.length) {
      setShowModal(true);
    } else {
      setTextMessage("Кошик порожній");
      setShowModalMessage(true);
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
      {MessageComponent}
    </>
  );
};

export default ButtonOpenCart;
