import { FC } from "react";
import Link from "next/link";
import OrderLine from "../OrderLine/OrderLine";

import style from "./AccountPageOrders.module.css";
interface IProps {
  orders: IOrder[];
}
const AccountPageOrders: FC<IProps> = ({ orders }) => {
  return (
    <>
      <ul className={style.listOrders}>
        {orders.map((order) => (
          <li key={order.id}>
            <Link href="#" className={style.linkOder}>
              <OrderLine order={order} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AccountPageOrders;
