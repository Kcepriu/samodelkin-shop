import { FC } from "react";
import Link from "next/link";
import IconAccountPage from "../IconAccountPage/IconAccountPage";

import {
  TYPES_ACCOUNT_ADD_INFORMATION,
  FRONTEND_ROUTES,
} from "@/constants/app-keys.const";

import style from "./AccountListPages.module.css";

interface IProps {
  currentPage: string;
  user: IUser;
}

const AccountListPages: FC<IProps> = ({ currentPage, user }) => {
  return (
    <ul className={style.listPage}>
      {TYPES_ACCOUNT_ADD_INFORMATION.map((element) => {
        if (element.onlyAuth && user.blocked) return null;

        return (
          <li key={element.url} className={style.elementList}>
            <Link
              className={style.link}
              data-active={element.url === `/${currentPage}`}
              href={`${FRONTEND_ROUTES.ACCOUNT}${element.url}`}
            >
              <IconAccountPage urlPage={element.url} />
              <p>{element.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AccountListPages;
