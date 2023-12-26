import { FC, ReactNode } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

interface IProps {
  children: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}
const Layout: FC<IProps> = async ({ children }): Promise<JSX.Element> => {
  return (
    <>
      <Breadcrumb />
      {children}
    </>
  );
};

export default Layout;
