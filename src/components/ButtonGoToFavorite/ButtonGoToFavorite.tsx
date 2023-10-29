"use client";

import { FC } from "react";
import Link from "next/link";
import {
  FRONTEND_ROUTES,
  ACCOUNT_ADD_INFORMATION_ROUTES,
} from "@/constants/app-keys.const";
import IconWithCount from "../IconWithCount/IconWithCount";
import { AiOutlineHeart } from "react-icons/ai";
import useFavorite from "@/stores/favorite.store";
import useStore from "@/helpers/useStore";
import style from "./ButtonGoToFavorite.module.css";

const ButtonGoToFavorite: FC = () => {
  const favorites = useStore(useFavorite, (state) => state.favorites);
  console.log("🚀 ~ favorites 55555:", favorites);

  return (
    <Link
      className={style.link}
      href={`${FRONTEND_ROUTES.ACCOUNT}${ACCOUNT_ADD_INFORMATION_ROUTES.FAVORITES}`}
    >
      <IconWithCount
        Icon={AiOutlineHeart}
        sizeIcon={32}
        className={style.icon}
        count={favorites?.length || 0}
      />
    </Link>
  );
};

export default ButtonGoToFavorite;
