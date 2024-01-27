"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Modal } from "@/components/Modal/Modal";
import Cart from "@/components/Cart/Cart";

interface ICartComponentHook {
  CartComponent: JSX.Element; // or JSX.Element, depending on the type of Cart and Modal components
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const useCartComponent = (): ICartComponentHook => {
  const [showModal, setShowModal] = useState(false);

  const handlerCloseCard = () => {
    setShowModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const CartComponent = (
    <>
      {showModal && (
        <Modal onClose={handlerCloseCard}>
          <Cart onClose={handlerCloseCard} />
        </Modal>
      )}
    </>
  );

  return { CartComponent, setShowModal };
};

export default useCartComponent;
