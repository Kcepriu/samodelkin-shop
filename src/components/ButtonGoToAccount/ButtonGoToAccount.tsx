import { FC } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";

import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import IconWithCount from "../IconWithCount/IconWithCount";
import { GoPerson } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";

import style from "./ButtonGoToAccount.module.css";

const ButtonGoToAccount: FC = async () => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;

  return (
    <>
      {!user && (
        <Link className={style.link} href={`${FRONTEND_ROUTES.SIGNIN}`}>
          <IconWithCount Icon={FiLogIn} sizeIcon={32} className={style.icon} />
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
