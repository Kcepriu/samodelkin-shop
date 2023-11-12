import { FC } from "react";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";
import AccountPageOrders from "@/components/Account/AccountPageOrders/AccountPageOrders";

const Order: FC = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;
  // return <p>Test</p>;
  return <AccountPageOrders user={user} />;
};

export default Order;
