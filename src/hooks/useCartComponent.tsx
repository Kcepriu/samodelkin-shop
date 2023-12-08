"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import Cart from "@/components/Cart/Cart";

interface CartComponentHook {
  CartComponent: JSX.Element; // or JSX.Element, depending on the type of Cart and Modal components
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const useCartComponent = (): CartComponentHook => {
  const [showModal, setShowModal] = useState(false);

  const handlerCloseCard = () => {
    setShowModal(false);
  };

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
