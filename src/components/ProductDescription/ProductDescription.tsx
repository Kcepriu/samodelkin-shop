import { FC } from "react";
import httpServices from "@/services/http";
import Description from "../Description/Description";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import style from "./ProductDescription.module.css";

interface IPros {
  productId: string;
}
const ProductDescription: FC<IPros> = async ({
  productId,
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
    </div>
  );
};

export default ProductDescription;
