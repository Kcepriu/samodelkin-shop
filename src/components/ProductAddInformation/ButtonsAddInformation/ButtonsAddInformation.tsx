import { FC } from "react";
import Link from "next/link";
import { getUrlAddInformation } from "@/helpers/addInformation";
import {
  PRODUCT_ADD_INFORMATION_ROUTES,
  TYPES_PRODUCT_ADD_INFORMATION,
} from "@/constants/app-keys.const";
import style from "./ButtonsAddInformation.module.css";

interface IProps {
  slug: string;
  currentUrlInfo: string;
  countVideos: string;
  countReviews: string;
  countManuals: string;
}
const ButtonsAddInformation: FC<IProps> = ({
  slug,
  currentUrlInfo,
  countVideos,
  countReviews,
  countManuals,
}) => {
  return (
    <ul className={style.listTypesInfo}>
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
          <li
            key={ind}
            className={style.typeInfo}
            data-active={currentUrlInfo === type_info.url}
          >
            <Link
              className={style.linkInfo}
              href={getUrlAddInformation(type_info.url, slug)}
            >
              {type_info.title}&nbsp;
              <span>{addTitle}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ButtonsAddInformation;
