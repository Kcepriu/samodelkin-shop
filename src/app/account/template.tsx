import { FC, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import InformationPerson from "@/components/Account/InformationPerson/InformationPerson";
import AccountListPages from "@/components/Account/AccountListPages/AccountListPages";

import style from "./template.module.css";

interface IProps {
  children: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}
const Layout: FC<IProps> = async ({ children }): Promise<JSX.Element> => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;
  return (
    <>
      <InformationPerson user={user} />

      <div className={style.wrapPage}>
        <div className={style.wrapListPage}>
          <p>List</p>
          <AccountListPages user={user} />
        </div>
        <div className={style.wrapContentPage}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
