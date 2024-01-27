import { FC } from "react";

import AccountPageFavorites from "@/components/Account/AccountPageFavorites/AccountPageFavorites";

const Favorites: FC = async (): Promise<JSX.Element> => {
  return <AccountPageFavorites />;
};

export default Favorites;
