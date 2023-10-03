import { FC } from "react";

import ProductsScreen from "@/screens/ProductsScreen/ProductsScreen";

interface IParams {
  params?: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Products: FC<IParams> = ({ searchParams }) => {
  return <ProductsScreen searchParams={searchParams} />;
};

export default Products;
