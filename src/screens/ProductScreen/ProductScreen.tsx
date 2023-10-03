import { FC } from "react";
import httpServices from "@/services/http";
import Product from "@/components/Product/Product";

import style from "./ProductScreen.module.css";

interface IProps {
  slug: string;
  addInfo: string;
}
const ProductScreen: FC<IProps> = async ({
  slug,
  addInfo,
}): Promise<JSX.Element> => {
  const responseProduct = await httpServices.getOneProducts(slug);

  return (
    <>
      <section>
        {responseProduct && responseProduct.data.length > 0 && (
          <Product product={responseProduct.data[0]} />
        )}
      </section>
    </>
  );
};

export default ProductScreen;
