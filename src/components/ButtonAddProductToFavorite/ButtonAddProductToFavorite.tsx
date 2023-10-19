"use client";
import { FC } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useFavorite } from "@/stores/favorite.store";
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
  const favorites = useFavorite((state) => state.favorites);
  const addFavorite = useFavorite((state) => state.addFavorite);
  const deleteFavorite = useFavorite((state) => state.deleteFavorite);

  const isFavorite = favorites.some((element) => element.id === product.id);

  const handleOnClick = async () => {
    if (isFavorite) {
      await deleteFavorite(product);
    } else {
      await addFavorite(product);
    }
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
