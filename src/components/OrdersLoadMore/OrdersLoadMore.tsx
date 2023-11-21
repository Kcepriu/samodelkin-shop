"use client";
import { FC, useState, useEffect } from "react";
import Orders from "../Orders/Orders";
import ButtonLoadMore from "../ButtonLoadMore/ButtonLoadMore";
import { getOrders } from "@/services/serverActionHttp";

interface IProps {
  pagination: IPagination | undefined;
}
const OrdersLoadMore: FC<IProps> = ({ pagination }) => {
  const countTotalPage = pagination?.pageCount || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;

    const newOrders = await getOrders(String(nextPage));

    if (newOrders) {
      setOrders((prevOrders: IOrder[]) => [...prevOrders, ...newOrders]);
      setCurrentPage(nextPage);
    }
  };

  if (countTotalPage === 1) return null;

  return (
    <>
      <Orders orders={orders} />
      {currentPage < countTotalPage && (
        <ButtonLoadMore handleLoadMore={handleLoadMore} text="Завантажити ще" />
      )}
    </>
  );
};

export default OrdersLoadMore;
