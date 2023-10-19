"use client";
import { FC } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "./ButtonAddProductToFavorite.module.css";

interface IProps {
  product: IProduct;
  size?: number;
  sizeIcon?: number;
}

const ButtonAddProductToFavorite: FC<IProps> = ({
  product,
  size = 24,
  sizeIcon = 24,
}) => {
  const isFavorite = false;
  const handleOnClick = () => {
    console.log("ButtonAddProductToFavorite", product.id);
  };

  return (
    <button
      className={`w-[${size}px] h-[${size}px] ${style.button}`}
      type="button"
      onClick={handleOnClick}
    >
      {isFavorite ? (
        <AiFillHeart size={sizeIcon} className={style.iconFavorite} />
      ) : (
        <AiOutlineHeart size={sizeIcon} className={style.icon} />
      )}
    </button>
  );
};
export default ButtonAddProductToFavorite;
