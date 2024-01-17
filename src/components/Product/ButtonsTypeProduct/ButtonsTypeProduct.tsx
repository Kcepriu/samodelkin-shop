"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import style from "./ButtonsTypeProduct.module.css";

interface IProps {
  product: IProduct;
}

const ButtonsTypeProduct: FC<IProps> = ({ product }) => {
  const router = useRouter();

  const { attributes } = product;
  const slugRelatedProduct =
    attributes.relatedProduct.data?.attributes.slug || "";
  const additions = attributes.additions;

  const urlRelatedProduct = !!slugRelatedProduct
    ? `${FRONTEND_ROUTES.PRODUCT}/${slugRelatedProduct}`
    : "#";

  const handleOnClickTypeProduct = () => {
    router.push(urlRelatedProduct);
  };

  return (
    <div className={style.wrapTypeProduct}>
      <button
        type="button"
        className={style.typeProduct}
        data-additions={!additions}
        data-disabled={!additions || !slugRelatedProduct}
        disabled={!additions || !slugRelatedProduct}
        onClick={handleOnClickTypeProduct}
      >
        Базовий набір
      </button>

      <button
        type="button"
        className={style.typeProduct}
        data-additions={additions}
        data-disabled={additions || !slugRelatedProduct}
        disabled={additions || !slugRelatedProduct}
        onClick={handleOnClickTypeProduct}
      >
        Розширення
      </button>
    </div>
  );
};

export default ButtonsTypeProduct;
