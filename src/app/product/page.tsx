import { FC } from "react";

import ProductsScreen from "@/screens/ProductsScreen/ProductsScreen";
import httpServices from "@/services/http";

interface IParams {
  params?: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Products: FC<IParams> = async ({
  searchParams,
}): Promise<JSX.Element> => {
  const { page = "1", category = "" } = searchParams;
  const categoryId = typeof category === "string" ? category : category[0];
  const currentPage = typeof page === "string" ? page : page[0];

  const responseProducts = await httpServices.getProducts({
    page: currentPage,
    category: categoryId,
  });

  const products =
    responseProducts && responseProducts.data.length > 0
      ? responseProducts.data
      : [];

  const pageCount = responseProducts?.meta?.pagination.pageCount || 1;

  return (
    <ProductsScreen
      products={products}
      currentPage={Number(currentPage)}
      categoryId={categoryId}
      pageCount={pageCount}
    />
  );
};

export const revalidate = 60;

export default Products;
