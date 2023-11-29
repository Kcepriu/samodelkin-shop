import { FC } from "react";
import { redirect, RedirectType } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import {
  ACCOUNT_ADD_INFORMATION_ROUTES,
  FRONTEND_ROUTES,
} from "@/constants/app-keys.const";

const PageAccount: FC = async () => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;
  if (!!user) {
    redirect(
      `${FRONTEND_ROUTES.ACCOUNT}${ACCOUNT_ADD_INFORMATION_ROUTES.ORDERS}`,
      RedirectType.replace
    );
  } else {
    redirect(
      `${FRONTEND_ROUTES.ACCOUNT}${ACCOUNT_ADD_INFORMATION_ROUTES.FAVORITES}`,
      RedirectType.replace
    );
  }
};

export default PageAccount;
