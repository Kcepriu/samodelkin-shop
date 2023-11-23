import { FC } from "react";
import httpServices from "@/services/http";
import Link from "next/link";
import Description from "../Description/Description";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import { PiArrowLineDown } from "react-icons/pi";
import style from "./ProductAddInfoDescription.module.css";

interface IPros {
  productId: string;
  urlToManuals: string;
}
const ProductAddInfoDescription: FC<IPros> = async ({
  productId,
  urlToManuals,
}): Promise<JSX.Element> => {
  const respProductDescription = await httpServices.getProductDescriptions(
    productId
  );

  if (!respProductDescription || respProductDescription.data.length === 0)
    return <></>;

  const ProductDescription = respProductDescription.data[0].attributes.content;

  return (
    <div className={style.wrapContent}>
      <Description
        content={ProductDescription}
        type={TypeDescription.Product}
      />
      <Link className={style.link} href={urlToManuals}>
        Завантажити інструкції
        <PiArrowLineDown size={24} />
      </Link>
    </div>
  );
};

export default ProductAddInfoDescription;
