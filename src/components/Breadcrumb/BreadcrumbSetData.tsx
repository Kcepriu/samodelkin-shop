"use client";
import { FC } from "react";
import useBreadcrumb from "@/stores/breadcrumb.store";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";

interface IProps {
  isInProduct: boolean;
  category: ICategorie | null;
}

const BreadcrumbSetData: FC<IProps> = ({ isInProduct, category }) => {
  const setBreadcrumb = useBreadcrumb((state) => state.setBreadcrumb);

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

  return <></>;
};

export default BreadcrumbSetData;
