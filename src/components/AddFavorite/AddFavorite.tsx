"use client";
import { FC } from "react";
import useSWR from "swr";
import { readFavorite, saveFavorites } from "@/services/localStorage";

import Image from "next/image";

import iconHeart from "@/assets/icons/heart.svg";
interface IProps {
  product: IProduct;
}

const AddFavorite: FC<IProps> = ({ product }) => {
  const { data, mutate } = useSWR("favorite", readFavorite);
  const handleClick = () => {};
  return (
    <button type="button">
      <Image
        // className={styles.icon}
        src={iconHeart}
        alt="icon"
        width={24}
        height={24}
        priority
      />
    </button>
  );
};

export default AddFavorite;
