"use client";
import { FC, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { Modal } from "@/components/Modal/Modal";
import IconWithCount from "../IconWithCount/IconWithCount";
import Cart from "../Cart/Cart";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";

import style from "./ButtonOpenCart.module.css";

const ButtonOpenCart: FC = () => {
  const cart = useStore(useCart, (state) => state.products);

  const [showModal, setShowModal] = useState(false);

  const handlerOpenCard = () => {
    setShowModal(true);
  };

  const handlerCloseCard = () => {
    setShowModal(false);
  };

  return (
    <>
      <button type="button" onClick={handlerOpenCard}>
        <IconWithCount
          Icon={BsCart3}
          sizeIcon={32}
          className={style.icon}
          count={cart?.length || 0}
        />
      </button>
      {showModal && (
        <Modal onClose={handlerCloseCard}>
          <Cart onClose={handlerCloseCard} />
        </Modal>
      )}
    </>
  );
};

export default ButtonOpenCart;
