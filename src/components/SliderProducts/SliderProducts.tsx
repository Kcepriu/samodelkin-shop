"use client";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import ProductCard from "@/components/ProductCard/ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./SliderProducts.css";

import style from "./SliderProducts.module.css";

interface IProps {
  productList: IProduct[];
}

const SliderProducts: FC<IProps> = ({ productList }) => {
  return (
    <div className={style.wrapSwiper}>
      <Swiper
        loop={true}
        navigation={{
          enabled: true,
          // nextEl: style.buttonPrev,
          // prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
        className="mySwiperProduct"
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
      >
        {productList.map((product) => (
          <SwiperSlide key={product.id} className={style.elementCard}>
            <div className={style.elementCard}>
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className={style.wrapButton}>
        <button className={style.buttonPrev} type="button">
          Prev
        </button>
        <button className="swiper-button-prev" type="button">
          Next
        </button>
      </div> */}
    </div>
  );
};

export default SliderProducts;
