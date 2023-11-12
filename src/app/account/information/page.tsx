import { FC } from "react";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import AccountPageInformation from "@/components/Account/AccountPageInformation/AccountPageInformation";

const AccountInformation: FC = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;
  return <AccountPageInformation user={user} />;
};

export default AccountInformation;
