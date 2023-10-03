import { FC } from "react";
import httpServices from "@/services/http";
import ProductList from "@/components/ProductList/ProductList";
import Pagination from "@/components/Pagination/Pagination";
import FilterPanel from "@/components/FilterPanel/FilterPanel";

import style from "./ProductsScreen.module.css";

interface IParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductsScreen: FC<IParams> = async ({
  searchParams,
}): Promise<JSX.Element> => {
  const { page = "1", category = "" } = searchParams;

  const responseProducts = await httpServices.getProducts({
    page: String(page),
    category: String(category),
  });
  const pageCount = responseProducts?.meta?.pagination.pageCount || 1;

  return (
    <>
      <section className={style.wrapPage}>
        <div className={style.wrapFilter}>
          <FilterPanel searchParams={searchParams} />
        </div>

        <div className={style.wrapContent}>
          {responseProducts && responseProducts.data.length > 0 && (
            <ProductList productList={responseProducts.data} />
          )}

          {pageCount > 1 && (
            <Pagination pageCount={pageCount} forcePage={page} />
          )}
        </div>
      </section>
      <section className={style.wrapSection}>
        <p>about Categories</p>
      </section>
    </>
  );
};

export default ProductsScreen;
