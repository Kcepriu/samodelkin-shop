import { FC } from "react";
import Link from "next/link";
import httpServices from "@/services/http";
import ProductAddInfoReviews from "@/components/ProductAddInfoReviews/ProductAddInfoReviews";

import {
  FRONTEND_ROUTES,
  ADD_INFORMATION_ROUTES,
  TYPES_ADD_INFORMATION_PRODUCT,
} from "@/constants/app-keys.const";

import style from "./ProductAddInformation.module.css";

interface IProps {
  slug: string;
  addInfo: string;
}

const getUrlAddInformation = (typeInformation: string, slug: string) => {
  return `${FRONTEND_ROUTES.PRODUCT}/${slug}${typeInformation}`;
};

const ProductAddInformation: FC<IProps> = async ({
  slug,
  addInfo,
}): Promise<JSX.Element> => {
  const currentUrlInfo = addInfo === "" ? addInfo : `/${addInfo}`;
  const responseProduct = await httpServices.getOneProducts(slug);

  if (!responseProduct || responseProduct.data.length === 0) return <></>;

  return (
    <>
      <ul className={style.listTypesInfo}>
        {TYPES_ADD_INFORMATION_PRODUCT.map((type_info, ind) => {
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
                {type_info.title}
              </Link>
            </li>
          );
        })}
      </ul>
      {currentUrlInfo === ADD_INFORMATION_ROUTES.DESCRIBE && <p>DESCRIBE</p>}
      {currentUrlInfo === ADD_INFORMATION_ROUTES.INFO && <p>INFO</p>}
      {currentUrlInfo === ADD_INFORMATION_ROUTES.REVIEWS && (
        <ProductAddInfoReviews product={responseProduct.data[0]} />
      )}
      {currentUrlInfo === ADD_INFORMATION_ROUTES.VIDEOS && <p>VIDEOS</p>}
    </>
  );
};

export default ProductAddInformation;
