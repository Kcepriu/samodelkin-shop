import { FC } from "react";
import ProductList from "@/components/ProductList/ProductList";
import Pagination from "@/components/Pagination/Pagination";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import CategoryDescription from "@/components/CategoryDescription/CategoryDescription";

import style from "./ProductsScreen.module.css";

interface IParams {
  products: IProduct[];
  categoryId: string;
  pageCount: number;
  currentPage: number;
}

const ProductsScreen: FC<IParams> = ({
  products,
  pageCount,
  currentPage,
  categoryId,
}) => {
  return (
    <>
      <section className={style.wrapPage}>
        <div className={style.wrapFilter}>
          <FilterPanel categoryId={categoryId} />
        </div>

        <div className={style.wrapContent}>
          {products.length > 0 && <ProductList productList={products} />}

          {pageCount > 1 && (
            <Pagination pageCount={pageCount} forcePage={currentPage} />
          )}
        </div>
      </section>
      <section className={style.wrapSection}>
        <CategoryDescription categoryId={categoryId} />
      </section>
    </>
  );
};

export default ProductsScreen;
