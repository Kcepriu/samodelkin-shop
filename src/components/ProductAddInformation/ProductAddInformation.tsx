import { FC } from "react";

import { notFound } from "next/navigation";
import httpServices from "@/services/http";
import ProductAddInfoReviews from "@/components/ProductAddInfoReviews/ProductAddInfoReviews";
import ProductAddInfoCharacteristics from "../ProductAddInfoCharacteristics/ProductAddInfoCharacteristics";
import ProductAddInfoDescription from "../ProductAddInfoDescription/ProductAddInfoDescription";
import ProductAddInfoVideos from "../ProductAddInfoVideos/ProductAddInfoVideos";
import ProductAddInfoBoxContent from "../ProductAddInfoBoxContent/ProductAddInfoBoxContent";
import ButtonsAddInformation from "./ButtonsAddInformation/ButtonsAddInformation";
import ButtonsAddInformationSlider from "./ButtonsAddInformationSlider/ButtonsAddInformationSlider";
import { getUrlAddInformation } from "@/helpers/addInformation";
import { PRODUCT_ADD_INFORMATION_ROUTES } from "@/constants/app-keys.const";
import style from "./ProductAddInformation.module.css";

interface IProps {
  slug: string;
  addInfo: string;
}

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

  const manuals = product.attributes.manual;
  const videos = product.attributes.videos;
  const reviews = responseReviews?.data;
  const paginationReviews = responseReviews?.meta.pagination;
  const countVideos = videos.length > 0 ? String(videos.length) : "";
  const countReviews =
    paginationReviews && paginationReviews.total > 0
      ? String(paginationReviews.total)
      : "";
  const countManuals = manuals.length > 0 ? String(manuals.length) : "";
  const urlToManuals = getUrlAddInformation(
    PRODUCT_ADD_INFORMATION_ROUTES.MANUALS,
    slug
  );

  const findUrl = Object.values(PRODUCT_ADD_INFORMATION_ROUTES).find(
    (element) => element === currentUrlInfo
  );
  if (!!currentUrlInfo && !findUrl) notFound();

  return (
    <>
      <div className={style.wrapAddButtons}>
        <ButtonsAddInformation
          slug={slug}
          currentUrlInfo={currentUrlInfo}
          countVideos={countVideos}
          countReviews={countReviews}
          countManuals={countManuals}
        />
      </div>
      <div className={style.wrapAddButtonsClient}>
        <ButtonsAddInformationSlider
          slug={slug}
          currentUrlInfo={currentUrlInfo}
          countVideos={countVideos}
          countReviews={countReviews}
          countManuals={countManuals}
        />
      </div>

      {currentUrlInfo === PRODUCT_ADD_INFORMATION_ROUTES.DESCRIBE && (
        <ProductAddInfoDescription
          productId={String(product.id)}
          manuals={manuals}
        />
      )}

      {currentUrlInfo === PRODUCT_ADD_INFORMATION_ROUTES.INFO && (
        <ProductAddInfoCharacteristics product={product} />
      )}

      {currentUrlInfo === PRODUCT_ADD_INFORMATION_ROUTES.REVIEWS && (
        <ProductAddInfoReviews
          product={product}
          reviews={reviews}
          paginationReviews={paginationReviews}
        />
      )}

      {currentUrlInfo === PRODUCT_ADD_INFORMATION_ROUTES.VIDEOS && (
        <ProductAddInfoVideos videos={videos} />
      )}

      {currentUrlInfo === PRODUCT_ADD_INFORMATION_ROUTES.BOX_CONTENT && (
        <ProductAddInfoBoxContent
          boxContent={product.attributes?.boxContent || ""}
        />
      )}
    </>
  );
};

export default ProductAddInformation;
