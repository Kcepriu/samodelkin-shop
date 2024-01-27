"use client";
import { FC } from "react";
import SliderProducts from "@/components/SliderProducts/SliderProducts";
import useRevised from "@/stores/revised.store";
import useStore from "@/helpers/useStore";
import { SLIDES_PER_VIEW } from "@/constants/app-keys.const";
import style from "./RevisedProducts.module.css";

const RevisedProducts: FC = () => {
  const revised = useStore(useRevised, (state) => state.revised);

  return (
    <>
      {!!revised && revised.length > 0 && (
        <>
          <h2 className={style.titleSection}>Переглянуті</h2>
          <div className={style.wrapSwiper}>
            <SliderProducts
              productList={revised}
              slidesPerView={SLIDES_PER_VIEW}
            />
          </div>
        </>
      )}
    </>
  );
};

export default RevisedProducts;
