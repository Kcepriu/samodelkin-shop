"use client";
import { FC } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import IconWithCount from "../IconWithCount/IconWithCount";
import { GoPerson } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";
import { PiArrowLineRightLight } from "react-icons/pi";

import style from "./ButtonGoToAccount.module.css";

const ButtonGoToAccount: FC = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      {!user && (
        <Link className={style.link} href={`${FRONTEND_ROUTES.SIGNIN}`}>
          <IconWithCount
            Icon={PiArrowLineRightLight}
            sizeIcon={32}
            className={style.icon}
          />
        </Link>
      )}
      {!!user && (
        <Link className={style.link} href={`${FRONTEND_ROUTES.ACCOUNT}`}>
          <IconWithCount Icon={GoPerson} sizeIcon={32} className={style.icon} />
        </Link>
      )}
    </>
  );
};

export default ButtonGoToAccount;
