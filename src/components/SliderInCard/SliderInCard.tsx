"use client";
import { FC, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./SliderInCard.css";

import style from "./SliderInCard.module.css";

interface IProps {
  images: IImage[];
  title: string;
}

const SliderInCard: FC<IProps> = ({ images, title }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className={style.wrapSectionSlider}>
      <div className={style.wrapSlider}>
        <Swiper
          // style={{
          //   "--swiper-navigation-color": "#fff",
          //   "--swiper-pagination-color": "#fff",
          // }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiperInCardLarge"
        >
          {images.map((element, ind) => {
            return (
              <SwiperSlide key={element.id}>
                {/* <p>image</p> */}
                <Image
                  priority={ind === 0}
                  // className={style.image}
                  src={element.attributes.url}
                  alt={title}
                  height={500}
                  width={500}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiperInCardSmall"
        >
          {images.map((element, ind) => {
            return (
              <SwiperSlide key={element.id}>
                <Image
                  priority={ind === 0}
                  // className={style.image}
                  src={element.attributes.url}
                  alt={title}
                  height={50}
                  width={50}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
export default SliderInCard;
