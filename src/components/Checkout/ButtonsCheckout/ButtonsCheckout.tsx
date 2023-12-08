"use client";

import { FC } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import style from "./ButtonsCheckout.module.css";

const ButtonsCheckout: FC = () => {
  const router = useRouter();

  const handleGoToBach = () => {
    router.back();
  };

  return (
    <div className={style.wrapButton}>
      <button
        type="button"
        className={style.buttonBack}
        onClick={handleGoToBach}
      >
        <IoArrowBackCircleOutline className={style.iconBack} size={24} />
        Повернутися
      </button>

      <button type="submit" className={style.buttonCheckout}>
        Оформити замовлення
      </button>
    </div>
  );
};

export default ButtonsCheckout;
