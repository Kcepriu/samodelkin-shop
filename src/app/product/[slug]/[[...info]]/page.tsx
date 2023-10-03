import React, { FC } from "react";
import ProductAddInformation from "@/components/ProductAddInformation/ProductAddInformation";
import style from "./page.module.css";

interface IProps {
  params: {
    slug: string;
    info?: string[];
  };
}

const ProductAddInfoPage: FC<IProps> = ({ params }) => {
  const { slug, info } = params;
  const addInfo = !info ? "" : info[0];
  return (
    <section className={style.sectionAddInformation}>
      <ProductAddInformation slug={slug} addInfo={addInfo} />
    </section>
  );
};

export default ProductAddInfoPage;
