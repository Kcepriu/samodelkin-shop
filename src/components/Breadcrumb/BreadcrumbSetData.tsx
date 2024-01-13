"use client";
import { FC, useEffect } from "react";
import useBreadcrumb from "@/stores/breadcrumb.store";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";

interface IProps {
  isInProduct: boolean;
  category: ICategorie | null;
}

const BreadcrumbSetData: FC<IProps> = ({ isInProduct, category }) => {
  const setBreadcrumb = useBreadcrumb((state) => state.setBreadcrumb);

  useEffect(() => {
    let newBreadcrumb = [
      { title: "Всі ігри", url: !!category ? FRONTEND_ROUTES.PRODUCT : "" },
    ];

    if (!!category)
      newBreadcrumb = [
        ...newBreadcrumb,
        {
          title: category.attributes.title,
          url: isInProduct
            ? `${FRONTEND_ROUTES.PRODUCT}?category=${category.attributes.slug}`
            : "",
        },
      ];

    setBreadcrumb(newBreadcrumb);
  }, [isInProduct, category, setBreadcrumb]);

  return <></>;
};

export default BreadcrumbSetData;
