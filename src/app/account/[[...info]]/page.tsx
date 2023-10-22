import { FC } from "react";
import AccountListPages from "@/components/Account/AccountListPages/AccountListPages";
import RouterPageAccount from "@/components/Account/RouterPageAccount/RouterPageAccount";
import { GoPerson } from "react-icons/go";
import style from "./page.module.css";

interface IProps {
  params: {
    info?: string[];
  };
}

const tempGetAuthUser = (auth: boolean): IUser => {
  return auth
    ? {
        id: 1,
        username: "Serhii Kostiuchenko",
        email: "test@mail.ua",
        provider: "local",
        confirmed: true,
        blocked: false,
        isAdmin: true,
        fullName: "Serhii Kostiuchenko",
      }
    : {
        id: 0,
        username: "Гість",
        email: "",
        provider: "local",
        confirmed: false,
        blocked: true,
        fullName: "Гість",
      };
};

const PageAccount: FC<IProps> = ({ params }) => {
  const { info } = params;
  const currentPage = !info ? "" : info[0];

  const authUser = tempGetAuthUser(true);

  const emailUser = !!authUser ? authUser.email : "";
  const userName = !!authUser ? authUser.fullName : "Гість";

  return (
    <>
      <div className={style.wrapUserInfo}>
        <GoPerson size={24} />
        <div>
          <p>{userName}</p>
          <p>{emailUser}</p>
        </div>
      </div>
      <div className={style.wrapPage}>
        <div className={style.wrapListPage}>
          <AccountListPages currentPage={currentPage} user={authUser} />
        </div>
        <div className={style.wrapContentPage}>
          <RouterPageAccount currentPage={currentPage} user={authUser} />
        </div>
      </div>
    </>
  );
};

export default PageAccount;
