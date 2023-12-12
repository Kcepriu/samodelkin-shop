"use client";
import { FC, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { PiArrowCircleLeft, PiArrowCircleRight } from "react-icons/pi";

import ProductCard from "@/components/ProductCard/ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./SliderProducts.css";

import style from "./SliderProducts.module.css";

interface IProps {
  productList: IProduct[];
  slidesPerView: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
}

const SliderProducts: FC<IProps> = ({ productList, slidesPerView }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={style.wrapSwiper}>
      <Swiper
        loop={true}
        navigation={{
          enabled: true,
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            typeof swiper.params.navigation !== "boolean" &&
            !!swiper.params.navigation
          ) {
            const navigation = swiper.params.navigation;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
          swiper.navigation.update();
        }}
        modules={[Navigation]}
        className="mySwiperProduct"
        breakpoints={{
          480: {
            slidesPerView: slidesPerView.mobile,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: slidesPerView.tablet,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: slidesPerView.desktop,
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
        <div className={style.wrapButton}>
          <div className={style.buttonPrevNext} ref={prevRef}>
            <PiArrowCircleLeft size={32} />
          </div>
          <div className={style.buttonPrevNext} ref={nextRef}>
            <PiArrowCircleRight size={32} />
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default SliderProducts;
