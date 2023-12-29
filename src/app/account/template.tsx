import { FC, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import InformationPerson from "@/components/Account/InformationPerson/InformationPerson";
import AccountListPages from "@/components/Account/AccountListPages/AccountListPages";
import ButtonSignOut from "@/components/Account/InformationPerson/ButtonSignOut/ButtonSignOut";

import style from "./template.module.css";

interface IProps {
  children: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}
const Template: FC<IProps> = async ({ children }): Promise<JSX.Element> => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;
  return (
    <>
      <InformationPerson />

      <div className={style.wrapPage}>
        <div className={style.wrapListPage}>
          <AccountListPages user={user} />
          <ButtonSignOut />
        </div>
        <div className={style.wrapContentPage}>{children}</div>
      </div>
    </>
  );
};

export default Template;
