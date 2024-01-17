import { FC, ReactNode } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

import style from "./template.module.css";

interface IProps {
  children: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

const TemplateProduct: FC<IProps> = ({ children }) => {
  return (
    <>
      <div className={style.wrapBreadcrumb}>
        <Breadcrumb />
      </div>
      {children}
    </>
  );
};

export default TemplateProduct;
