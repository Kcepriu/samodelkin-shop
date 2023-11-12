import { FC } from "react";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import AccountPageFavorites from "@/components/Account/AccountPageFavorites/AccountPageFavorites";

const Favorites: FC = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;
  return <AccountPageFavorites user={user} />;
};

export default Favorites;
