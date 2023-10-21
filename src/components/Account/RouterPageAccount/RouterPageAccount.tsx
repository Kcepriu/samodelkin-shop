import { FC } from "react";
import { notFound } from "next/navigation";
import AccountPageOrders from "../AccountPageOrders/AccountPageOrders";
import AccountPageInformation from "../AccountPageInformation/AccountPageInformation";
import AccountPageFavorites from "../AccountPageFavorites/AccountPageFavorites";
import AccountPageReviews from "../AccountPageReviews/AccountPageReviews";
import {
  ACCOUNT_ADD_INFORMATION_ROUTES,
  TYPES_ACCOUNT_ADD_INFORMATION,
} from "@/constants/app-keys.const";

interface IProps {
  currentPage: string;
  user: IUser;
}

const RouterPageAccount: FC<IProps> = ({ currentPage, user }) => {
  // Шукаємо  TYPES_ACCOUNT_ADD_INFORMATION, якщо там нема то 404
  // Перевіряємо чи треба права. Якщо треба і в нас є , то переходимо по урлу
  // Якщо нема, то шукаємо DEFAULT_FROM_GUEST в TYPES_ACCOUNT_ADD_INFORMATION
  // якщо знайшли і йому не треба прав, то переходимо по DEFAULT_FROM_GUEST
  //Інакше  помилка

  if (`/${currentPage}` === ACCOUNT_ADD_INFORMATION_ROUTES.ORDERS)
    return <AccountPageOrders user={user} />;
  if (`/${currentPage}` === ACCOUNT_ADD_INFORMATION_ROUTES.INFORMATION)
    return <AccountPageInformation user={user} />;
  if (`/${currentPage}` === ACCOUNT_ADD_INFORMATION_ROUTES.FAVORITES)
    return <AccountPageFavorites user={user} />;
  if (`/${currentPage}` === ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS)
    return <AccountPageReviews user={user} />;

  return <>{notFound()}</>;
};

export default RouterPageAccount;
