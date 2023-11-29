"use client";
import { FC } from "react";
import useFavorite from "@/stores/favorite.store";
import useStore from "@/helpers/useStore";
import ProductList from "@/components/ProductList/ProductList";

const AccountPageFavorites: FC = () => {
  const products = useStore(useFavorite, (state) => state.favorites);
  if (!products) return null;

  return <ProductList productList={products} />;
};

export default AccountPageFavorites;
