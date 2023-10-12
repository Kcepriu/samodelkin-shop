import { FC } from "react";
import Link from "next/link";
import httpServices from "@/services/http";
import ProductAddInfoReviews from "@/components/ProductAddInfoReviews/ProductAddInfoReviews";
import ProductAddInfoCharacteristics from "../ProductAddInfoCharacteristics/ProductAddInfoCharacteristics";
import ProductDescription from "../ProductDescription/ProductDescription";
import ProductAddInfoVideos from "../ProductAddInfoVideos/ProductAddInfoVideos";
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
  const product = responseProduct.data[0];
  const responseReviews = await httpServices.getProductReviews(
    String(product.id)
  );

  const videos = product.attributes.videos;
  const reviews = responseReviews?.data;
  const paginationReviews = responseReviews?.meta.pagination;
  const countVideos = videos.length > 0 ? String(videos.length) : "";
  const countReviews = paginationReviews ? String(paginationReviews.total) : "";
  const urlToManuals = getUrlAddInformation(
    ADD_INFORMATION_ROUTES.MANUALS,
    slug
  );

  return (
    <>
      <ul className={style.listTypesInfo}>
        {TYPES_ADD_INFORMATION_PRODUCT.map((type_info, ind) => {
          let addTitle = "";
          if (type_info.url === ADD_INFORMATION_ROUTES.VIDEOS) {
            addTitle = countVideos;
          }
          if (type_info.url === ADD_INFORMATION_ROUTES.REVIEWS) {
            addTitle = countReviews;
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
      {currentUrlInfo === ADD_INFORMATION_ROUTES.DESCRIBE && (
        <ProductDescription
          productId={String(product.id)}
          urlToManuals={urlToManuals}
        />
      )}

      {currentUrlInfo === ADD_INFORMATION_ROUTES.INFO && (
        <ProductAddInfoCharacteristics product={product} />
      )}

      {currentUrlInfo === ADD_INFORMATION_ROUTES.REVIEWS && (
        <ProductAddInfoReviews
          product={product}
          reviews={reviews}
          paginationReviews={paginationReviews}
        />
      )}

      {currentUrlInfo === ADD_INFORMATION_ROUTES.VIDEOS && (
        <ProductAddInfoVideos videos={videos} />
      )}

      {currentUrlInfo === ADD_INFORMATION_ROUTES.MANUALS && (
        <div>
          <p>MANUAL</p>
        </div>
      )}
    </>
  );
};

export default ProductAddInformation;
