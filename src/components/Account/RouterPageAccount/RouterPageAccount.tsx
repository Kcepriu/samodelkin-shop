import { FC } from "react";
import { notFound, redirect } from "next/navigation";
import { User } from "next-auth";

import AccountPageOrders from "../AccountPageOrders/AccountPageOrders";
import AccountPageInformation from "../AccountPageInformation/AccountPageInformation";
import AccountPageFavorites from "../AccountPageFavorites/AccountPageFavorites";
import AccountPageReviews from "../AccountPageReviews/AccountPageReviews";
import {
  ACCOUNT_ADD_INFORMATION_ROUTES,
  TYPES_ACCOUNT_ADD_INFORMATION,
  FRONTEND_ROUTES,
} from "@/constants/app-keys.const";

interface IProps {
  currentPage: string;
  user: User | undefined;
}

const RouterPageAccount: FC<IProps> = async ({ currentPage, user }) => {
  const getUrlPageFromAccess = (currentUrl: string, user: User | undefined) => {
    const nextUrl = TYPES_ACCOUNT_ADD_INFORMATION.find(
      (element) => element.url === currentUrl
    );

    // * 1
    if (!nextUrl) return "";
    // * 2
    if (!nextUrl.onlyAuth) return nextUrl.url;
    // * 3
    if (nextUrl.onlyAuth && !!user) return nextUrl.url;

    const defaultUrl = TYPES_ACCOUNT_ADD_INFORMATION.find(
      (element) =>
        element.url === ACCOUNT_ADD_INFORMATION_ROUTES.DEFAULT_FROM_GUEST
    );
    // * 4
    if (!defaultUrl || defaultUrl.onlyAuth) return "";
    // * 5
    return defaultUrl.url;
  };

  const nextUrl = getUrlPageFromAccess(`/${currentPage}`, user);

  if (!nextUrl) return <>{notFound()}</>;

  if (`/${currentPage}` !== nextUrl)
    redirect(`${FRONTEND_ROUTES.ACCOUNT}${nextUrl}`);

  if (nextUrl === ACCOUNT_ADD_INFORMATION_ROUTES.ORDERS)
    return <AccountPageOrders user={user} />;
  if (nextUrl === ACCOUNT_ADD_INFORMATION_ROUTES.INFORMATION)
    return <AccountPageInformation user={user} />;
  if (nextUrl === ACCOUNT_ADD_INFORMATION_ROUTES.FAVORITES)
    return <AccountPageFavorites user={user} />;
  if (nextUrl === ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS)
    return <AccountPageReviews userId={user?.id || ""} />;

  return <>{notFound()}</>;
};

export default RouterPageAccount;
