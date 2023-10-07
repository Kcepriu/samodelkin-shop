import { FC } from "react";
import Image from "next/image";
import style from "./RatingStar.module.css";
import imgStar from "@/assets/icons/star.svg";
import imgStarEmpty from "@/assets/icons/star_empty.svg";

interface IProps {
  rating: number;
  maxRating?: number;
}
const RatingStar: FC<IProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className={style.wrapRating}>
      {Array.from({ length: maxRating }, (_, ind) => {
        return ind < rating ? (
          <Image
            className={style.image}
            src={imgStar}
            alt="star"
            height={24}
            width={24}
          />
        ) : (
          <Image
            className={style.image}
            src={imgStarEmpty}
            alt="empty star"
            height={24}
            width={24}
          />
        );
      })}
    </div>
  );
};

export default RatingStar;
