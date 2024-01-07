"use client";
import { FC, useRef, MutableRefObject, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import { getUrlAddInformation } from "@/helpers/addInformation";
import {
  PRODUCT_ADD_INFORMATION_ROUTES,
  TYPES_PRODUCT_ADD_INFORMATION,
} from "@/constants/app-keys.const";
import style from "./ButtonsAddInformationSlider.module.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "./Slider.css";

interface IProps {
  slug: string;
  currentUrlInfo: string;
  countVideos: string;
  countReviews: string;
  countManuals: string;
}

const ButtonsAddInformationSlider: FC<IProps> = ({
  slug,
  currentUrlInfo,
  countVideos,
  countReviews,
  countManuals,
}) => {
  const swiperRef = useRef<any>(null);
  // const swiperRef: MutableRefObject<null>;

  useEffect(() => {
    if (swiperRef.current) {
      const founIndex = TYPES_PRODUCT_ADD_INFORMATION.findIndex(
        (type_info) => currentUrlInfo === type_info.url
      );

      if (founIndex >= 0) swiperRef.current.slideTo(founIndex, 0);
    }
  }, [currentUrlInfo]);

  return (
    <div className={style.listTypesInfo}>
      <Swiper
        onAfterInit={(swiper) => (swiperRef.current = swiper)}
        loop={true}
        // freeMode={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, FreeMode]}
        className="mySwiperAddInformation"
        breakpoints={{
          280: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          414: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        }}
      >
        {TYPES_PRODUCT_ADD_INFORMATION.map((type_info, ind) => {
          let addTitle = "";
          if (type_info.url === PRODUCT_ADD_INFORMATION_ROUTES.VIDEOS) {
            addTitle = countVideos;
          }
          if (type_info.url === PRODUCT_ADD_INFORMATION_ROUTES.REVIEWS) {
            addTitle = countReviews;
          }
          if (type_info.url === PRODUCT_ADD_INFORMATION_ROUTES.MANUALS) {
            addTitle = countManuals;
          }

          return (
            <SwiperSlide key={ind} className={style.elementCard}>
              <div
                // className={style.elementCard}
                data-active={currentUrlInfo === type_info.url}
                className={style.typeInfo}
              >
                <Link
                  className={style.linkInfo}
                  href={getUrlAddInformation(type_info.url, slug)}
                >
                  {type_info.title}&nbsp;
                  <span>{addTitle}</span>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ButtonsAddInformationSlider;
