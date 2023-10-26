"use client";
import { FC } from "react";
import { User } from "next-auth";
import useFavorite from "@/stores/favorite.store";
import useStore from "@/helpers/useStore";
import ProductList from "@/components/ProductList/ProductList";

interface IProps {
  user: User | undefined;
}
const AccountPageFavorites: FC<IProps> = ({ user }) => {
  const products = useStore(useFavorite, (state) => state.favorites);
  if (!products) return null;

  return <ProductList productList={products} />;
};

export default AccountPageFavorites;
