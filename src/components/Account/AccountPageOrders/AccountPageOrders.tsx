import { FC } from "react";
import { User } from "next-auth";
interface IProps {
  user: User | undefined;
}
const AccountPageOrders: FC<IProps> = ({ user }) => {
  return <>AccountPageOrders</>;
};

export default AccountPageOrders;
