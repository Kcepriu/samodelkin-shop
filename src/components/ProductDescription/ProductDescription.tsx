import { FC } from "react";
import httpServices from "@/services/http";
import Link from "next/link";
import Description from "../Description/Description";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import style from "./ProductDescription.module.css";

interface IPros {
  productId: string;
  urlToManuals: string;
}
const ProductDescription: FC<IPros> = async ({
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
      <Link className={style.linkInfo} href={urlToManuals}>
        Скачати інструкції
      </Link>

      <Description
        content={ProductDescription}
        type={TypeDescription.Product}
      />
    </div>
  );
};

export default ProductDescription;
