"use client";

import { FC } from "react";

interface IProps {
  onClose: () => void;
}
const Cart: FC<IProps> = ({ onClose }) => {
  return (
    <>
      <h2>Кошик</h2>

      <p> List products</p>

      <div>
        <button type="button" onClick={onClose}>
          Повернутися до покупок
        </button>
        <button type="button">Оформити замовлення</button>
      </div>
    </>
  );
};

export default Cart;
