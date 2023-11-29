"use client";
import { FC } from "react";
import useRevised from "@/stores/revised.store";
import useStore from "@/helpers/useStore";
import ProductList from "@/components/ProductList/ProductList";

const AccountPageRevised: FC = () => {
  const products = useStore(useRevised, (state) => state.revised);
  if (!products) return null;

  return <ProductList productList={products} />;
};

export default AccountPageRevised;
