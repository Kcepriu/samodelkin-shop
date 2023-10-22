import { FC } from "react";
import { ACCOUNT_ADD_INFORMATION_ROUTES } from "@/constants/app-keys.const";
import {
  PiShoppingBagOpenDuotone,
  PiEyeLight,
  PiChatDots,
  PiHeart,
} from "react-icons/pi";

interface IProps {
  urlPage: string;
  size?: number;
}
const IconAccountPage: FC<IProps> = ({ urlPage, size = 24 }) => {
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.ORDERS)
    return <PiShoppingBagOpenDuotone size={size} />;
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.INFORMATION)
    return <PiEyeLight size={size} />;
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.FAVORITES)
    return <PiHeart size={size} />;
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS)
    return <PiChatDots size={size} />;

  return null;
};

export default IconAccountPage;
