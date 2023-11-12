import { FC } from "react";
import httpServices from "@/services/http";
import AccountPageOrders from "@/components/Account/AccountPageOrders/AccountPageOrders";

const Order: FC = async () => {
  const { data: orders } = await httpServices.getOrders();
  return <AccountPageOrders orders={orders || []} />;
};

export default Order;
