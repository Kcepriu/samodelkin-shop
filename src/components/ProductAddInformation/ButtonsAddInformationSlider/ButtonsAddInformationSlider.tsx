"use client";
import { FC } from "react";
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
  return (
    <div className={style.listTypesInfo}>
      <Swiper
        loop={true}
        freeMode={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, FreeMode]}
        className="mySwiperAddInformation"
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
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
              <div className="swiper-zoom-container">
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
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ButtonsAddInformationSlider;
