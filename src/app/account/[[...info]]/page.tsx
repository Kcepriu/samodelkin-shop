import { FC } from "react";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import AccountListPages from "@/components/Account/AccountListPages/AccountListPages";
import RouterPageAccount from "@/components/Account/RouterPageAccount/RouterPageAccount";

import style from "./page.module.css";
import InformationPerson from "@/components/Account/InformationPerson/InformationPerson";

interface IProps {
  params: {
    info?: string[];
  };
}

const PageAccount: FC<IProps> = async ({ params }) => {
  const { info } = params;
  const currentPage = !info ? "" : info[0];

  const session = await getServerSession(authConfigs);
  const user = session?.user;

  return (
    <>
      <InformationPerson user={user} />

      <div className={style.wrapPage}>
        <div className={style.wrapListPage}>
          <AccountListPages currentPage={currentPage} user={user} />
        </div>
        <div className={style.wrapContentPage}>
          <RouterPageAccount currentPage={currentPage} user={user} />
        </div>
      </div>
    </>
  );
};

export default PageAccount;
