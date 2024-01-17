"use client";
import { FC } from "react";
import useFavorite from "@/stores/favorite.store";
import useStore from "@/helpers/useStore";
import ProductList from "@/components/ProductList/ProductList";
import SliderProducts from "@/components/SliderProducts/SliderProducts";

import style from "./AccountPageFavorites.module.css";

const AccountPageFavorites: FC = () => {
  const products = useStore(useFavorite, (state) => state.favorites);
  if (!products) return null;

  return (
    <>
      <ProductList productList={products} />
      {/* <div className={style.wrapProducts}>
        <ProductList productList={products} />
      </div> */}

      {/* <div className={style.wrapProductsSlider}>
        <SliderProducts
          productList={products}
          slidesPerView={{ desktop: 3, tablet: 2, mobile: 2 }}
        />
      </div> */}
    </>
  );
};

export default AccountPageFavorites;
