"use client";
import { FC, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Zoom } from "swiper/modules";
import ReviewOne from "../Reviews/ReviewOne/ReviewOne";
import { getProductReviews, getUserReviews } from "@/services/serverActionHttp";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "./Slider.css";

import style from "./SliderReviews.module.css";

interface IProps {
  reviews: IReview[];
  owner?: {
    isProduct?: boolean;
    id: string;
  };
  isModerator?: boolean;
  isCreateReplyReview?: boolean;
  paginationReviews?: IPagination;
}

const SliderReviews: FC<IProps> = ({
  reviews,
  owner,
  paginationReviews,
  isModerator = false,
  isCreateReplyReview = false,
}) => {
  const countTotalPage = paginationReviews?.pageCount || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [workReviews, setWorkReviews] = useState<IReview[]>([]);

  useEffect(() => {
    setWorkReviews([...reviews]);
    setCurrentPage(1);
  }, [reviews]);

  const handleLoadMore = async () => {
    if (!owner) return; //if show getLastReviews then not load more

    if (currentPage >= countTotalPage) return;

    const nextPage = currentPage + 1;

    const newReviews = owner?.isProduct
      ? await getProductReviews(owner.id, String(nextPage))
      : await getUserReviews(owner.id, String(nextPage));
    if (newReviews) {
      setWorkReviews((prevReviews: IReview[]) => [
        ...prevReviews,
        ...newReviews?.data,
      ]);
      setCurrentPage(nextPage);
    }
  };

  return (
    <div className={style.wrapSwiper}>
      <Swiper
        // loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        zoom={true}
        modules={[Pagination, Zoom]}
        className="mySwiperReviews"
        onReachEnd={handleLoadMore}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
        }}
      >
        {workReviews.map((review) => (
          <SwiperSlide key={review.id} className={style.wrapCard}>
            <div className="swiper-zoom-container">
              <div className={style.elementCard}>
                <ReviewOne
                  review={review}
                  isModerator={isModerator}
                  isCreateReplyReview={isCreateReplyReview}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderReviews;
