"use client";
import { FC, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { Modal } from "@/components/Modal/Modal";
import Cart from "../Cart/Cart";
import style from "./ButtonOpenCart.module.css";

const ButtonOpenCart: FC = () => {
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
        <BsCart3 className={style.icon} size={24} />
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
