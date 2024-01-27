import { FC, Suspense } from "react";
import httpServices from "@/services/http";
import Orders from "@/components/Orders/Orders";
import OrdersLoadMore from "@/components/OrdersLoadMore/OrdersLoadMore";

const Order: FC = async () => {
  const responseOrders = await httpServices.getOrders();
  const orders = responseOrders?.data;
  const pagination = responseOrders?.meta?.pagination;

  return (
    <Suspense>
      <Orders orders={orders || []} />
      <OrdersLoadMore pagination={pagination} />
    </Suspense>
  );
};

export default Order;
