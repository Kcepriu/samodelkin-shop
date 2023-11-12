import { FC } from "react";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import AccountPageReviews from "@/components/Account/AccountPageReviews/AccountPageReviews";

const Reviews: FC = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;
  return <AccountPageReviews userId={user?.id || ""} />;
};

export default Reviews;
