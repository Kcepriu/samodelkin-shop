"use client";
import { FC, useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";
import ButtonLoadMore from "../ButtonLoadMore/ButtonLoadMore";
import { getProducts } from "@/services/serverActionHttp";

import style from "./ProductListLoadMore.module.css";

interface IProps {
  categoryId: string;
  paginationProducts: IPagination | undefined;
  filters: string;
}

const ProductListLoadMore: FC<IProps> = ({
  categoryId,
  paginationProducts,
  filters,
}) => {
  const countTotalPage = paginationProducts?.pageCount || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;

    const newProducts = await getProducts({
      page: String(nextPage),
      category: categoryId,
      filters,
    });

    if (newProducts) {
      setProducts((prevProducts: IProduct[]) => [
        ...prevProducts,
        ...newProducts?.data,
      ]);
      setCurrentPage(nextPage);
    }
  };

  if (countTotalPage === 1) return null;

  return (
    <>
      <ProductList productList={products} />

      <div className={style.wrapButton}>
        {currentPage < countTotalPage && (
          <ButtonLoadMore
            handleLoadMore={handleLoadMore}
            text="Завантажити ще"
          />
        )}
      </div>
    </>
  );
};

export default ProductListLoadMore;
