"use client";
import { FC } from "react";
import SliderProducts from "@/components/SliderProducts/SliderProducts";
import useRevised from "@/stores/revised.store";
import useStore from "@/helpers/useStore";
import style from "./RevisedProducts.module.css";

const RevisedProducts: FC = () => {
  const revised = useStore(useRevised, (state) => state.revised);

  console.log("🚀 ~ revised:", revised);

  return (
    <>
      {!!revised && revised.length > 0 && (
        <>
          <h2 className={style.titleSection}>Переглянуті</h2>
          <div className={style.wrapSwiper}>
            <SliderProducts
              productList={revised}
              slidesPerView={{ desktop: 3, tablet: 2, mobile: 2 }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default RevisedProducts;
