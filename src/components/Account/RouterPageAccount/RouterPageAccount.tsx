import { FC } from "react";
import { notFound, redirect } from "next/navigation";

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
  user: IUser;
}

const RouterPageAccount: FC<IProps> = ({ currentPage, user }) => {
  const getUrlPageFromAccess = (currentUrl: string, user: IUser) => {
    // Шукаємо  TYPES_ACCOUNT_ADD_INFORMATION, якщо там нема то 404
    // Перевіряємо чи треба права. Якщо треба і в нас є , то переходимо по урлу

    // Якщо нема, то шукаємо DEFAULT_FROM_GUEST в TYPES_ACCOUNT_ADD_INFORMATION
    // якщо знайшли і йому не треба прав, то переходимо по DEFAULT_FROM_GUEST
    //Інакше  помилка
    const nextUrl = TYPES_ACCOUNT_ADD_INFORMATION.find(
      (element) => element.url === currentUrl
    );

    if (!nextUrl) return "";
    if (!nextUrl.onlyAuth) return nextUrl.url;
    if (nextUrl.onlyAuth && !user.blocked) return nextUrl.url;

    const defaultUrl = TYPES_ACCOUNT_ADD_INFORMATION.find(
      (element) =>
        element.url === ACCOUNT_ADD_INFORMATION_ROUTES.DEFAULT_FROM_GUEST
    );

    if (!defaultUrl || defaultUrl.onlyAuth) return "";
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
    return <AccountPageReviews user={user} />;

  return <>{notFound()}</>;
};

export default RouterPageAccount;
