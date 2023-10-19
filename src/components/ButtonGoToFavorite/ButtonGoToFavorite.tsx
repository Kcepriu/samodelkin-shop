"use client";

import { FC } from "react";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";

import { AiOutlineHeart } from "react-icons/ai";
import { useFavorite } from "@/stores/favorite.store";
import style from "./ButtonGoToFavorite.module.css";

const ButtonGoToFavorite: FC = () => {
  const favorites = useFavorite((state) => state.favorites);
  return (
    <Link className={style.link} href={`${FRONTEND_ROUTES.FAVORITES}`}>
      <AiOutlineHeart size={24} className={style.icon} />
      {favorites.length > 0 && <p>{favorites.length}</p>}
    </Link>
  );
};

export default ButtonGoToFavorite;
