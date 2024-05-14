"use client";
import { FC, MouseEvent } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorite from "@/stores/favorite.store";
import useStore from "@/helpers/useStore";
import style from "./ButtonAddProductToFavorite.module.css";

interface IProps {
  product: IProduct;
  isEmptyIcon?: boolean;
}

const ButtonAddProductToFavorite: FC<IProps> = ({
  product,
  isEmptyIcon = false,
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
      await addFavorite(product);
    }
  };

  return (
    <button className={style.button} type="button" onClick={handleOnClick}>
      {!!isFavorite && <AiFillHeart className={style.iconFavorite} />}

      {!isFavorite && !isEmptyIcon && (
        <AiFillHeart
          data-is-empty-icon={isEmptyIcon}
          className={style.iconNoFavoriteFill}
        />
      )}

      {!isFavorite && isEmptyIcon && (
        <AiOutlineHeart className={style.iconNoFavorite} />
      )}
    </button>
  );
};
export default ButtonAddProductToFavorite;
