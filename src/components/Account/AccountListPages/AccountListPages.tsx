"use client";
import { FC } from "react";
import Link from "next/link";
import { User } from "next-auth";
import { usePathname } from "next/navigation";

import IconAccountPage from "../IconAccountPage/IconAccountPage";

import {
  TYPES_ACCOUNT_ADD_INFORMATION,
  FRONTEND_ROUTES,
} from "@/constants/app-keys.const";

import style from "./AccountListPages.module.css";

interface IProps {
  user: User | undefined;
}

const AccountListPages: FC<IProps> = ({ user }) => {
  const pathname = usePathname();
  return (
    <ul className={style.listPage}>
      {TYPES_ACCOUNT_ADD_INFORMATION.map((element) => {
        if (element.onlyAuth && !user) return null;

        return (
          <li key={element.url} className={style.elementList}>
            <Link
              className={style.link}
              data-active={
                `${FRONTEND_ROUTES.ACCOUNT}${element.url}` === `${pathname}`
              }
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
