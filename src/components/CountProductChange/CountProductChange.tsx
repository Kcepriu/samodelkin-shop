"use client";
import { FC, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useCart from "@/stores/cart.store";
import style from "./CountProductChange.module.css";

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

interface IProps {
  rowCart: ICartRow;
}

const CountProductChange: FC<IProps> = ({ rowCart }) => {
  const [count, setCount] = useState(rowCart.count);
  const changeCountProduct = useCart((state) => state.changeCountProduct);

  useEffect(() => {
    setCount(rowCart.count);
  }, [rowCart]);

  const debouncedChangeCount = useDebouncedCallback((value: number) => {
    changeCountProduct(rowCart.product.data, value);
  }, 1000);

  const handleChangeCount = (delta: number) => {
    setCount((prev) => {
      let result = prev + delta;
      if (prev + delta <= 0) return (result = 1);
      if (prev + delta >= 10) return (result = 10);

      debouncedChangeCount(result);

      return result;
    });
  };

  return (
    <div className={style.wrapComponent}>
      <button type="button" onClick={() => handleChangeCount(-1)}>
        <AiOutlineMinusCircle size={24} className={style.icon} />
      </button>

      <p>{count}</p>

      <button type="button" onClick={() => handleChangeCount(1)}>
        <AiOutlinePlusCircle size={24} className={style.icon} />
      </button>
    </div>
  );
};

export default CountProductChange;
