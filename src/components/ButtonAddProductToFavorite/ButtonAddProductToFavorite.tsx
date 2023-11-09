"use client";
import { FC, MouseEvent } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorite from "@/stores/favorite.store";
import useStore from "@/helpers/useStore";
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
  const favorites = useStore(useFavorite, (state) => state.favorites);
  const [addFavorite, deleteFavorite] = useFavorite((state) => [
    state.addFavorite,
    state.deleteFavorite,
  ]);

  const isFavorite =
    favorites?.some((element) => element.id === product.id) || false;

  const handleOnClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (isFavorite) {
      await deleteFavorite(product);
    } else {
      console.log("handleOnClick");
      await addFavorite(product);
    }
  };

  return (
    <button
      className={`w-[${size}px] h-[${size}px] ${style.button}`}
      type="button"
      onClick={handleOnClick}
    >
      {!!isFavorite ? (
        <AiFillHeart size={sizeIcon} className={style.iconFavorite} />
      ) : (
        <AiOutlineHeart size={sizeIcon} className={style.icon} />
      )}
    </button>
  );
};
export default ButtonAddProductToFavorite;
