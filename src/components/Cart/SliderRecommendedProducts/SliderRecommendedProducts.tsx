"use client";

import { FC, useState, useEffect } from "react";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import SliderProducts from "@/components/SliderProducts/SliderProducts";
import { getProductsByList } from "@/services/serverActionHttp";
import style from "./SliderRecommendedProducts.module.css";

import { SLIDES_PER_VIEW } from "@/constants/app-keys.const";

interface IProps {
  addAction: () => void;
}
const SliderRecommendedProducts: FC<IProps> = ({ addAction }) => {
  const cart = useStore(useCart, (state) => state.products);

  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>(
    []
  );

  useEffect(() => {
    const fetchRecommendedProducts = async (productsID: number[]) => {
      try {
        const responseFavorites = await getProductsByList(productsID);

        setRecommendedProducts(
          !!responseFavorites ? responseFavorites.data : []
        );
      } catch {
        setRecommendedProducts([]);
      }
    };

    if (!cart) return;

    const idRecommendedProducts = cart
      .filter(
        (rowCart) => rowCart.product.data?.attributes.relatedProduct?.data?.id
      )
      .map(
        (rowCart) => rowCart.product.data.attributes.relatedProduct.data!.id
      );

    fetchRecommendedProducts(idRecommendedProducts);
  }, [cart]);

  return (
    <>
      {recommendedProducts.length > 0 && (
        <>
          <h2 className={style.title}>Рекомендовані товари</h2>
          <SliderProducts
            productList={recommendedProducts}
            slidesPerView={SLIDES_PER_VIEW}
            addAction={addAction}
          />
        </>
      )}
    </>
  );
};

export default SliderRecommendedProducts;
