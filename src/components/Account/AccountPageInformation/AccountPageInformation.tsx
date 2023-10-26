import { FC } from "react";
import { User } from "next-auth";
interface IProps {
  user: User | undefined;
}
const AccountPageInformation: FC<IProps> = ({ user }) => {
  return <>AccountPageInformation</>;
};

export default AccountPageInformation;
