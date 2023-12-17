import { FC } from "react";
import { ACCOUNT_ADD_INFORMATION_ROUTES } from "@/constants/app-keys.const";
import {
  PiShoppingBagOpenDuotone,
  PiEyeLight,
  PiChatDots,
  PiHeart,
} from "react-icons/pi";
import { SiCodereview } from "react-icons/si";
import { GoPerson } from "react-icons/go";

interface IProps {
  urlPage: string;
  size?: number;
}
const IconAccountPage: FC<IProps> = ({ urlPage, size = 24 }) => {
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.ORDERS)
    return <PiShoppingBagOpenDuotone size={size} />;
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.INFORMATION)
    return <GoPerson size={size} />;
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.FAVORITES)
    return <PiHeart size={size} />;
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.REVISED)
    return <PiEyeLight size={size} />;
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS)
    return <PiChatDots size={size} />;
  if (urlPage === ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS_MODERATOR)
    return <SiCodereview size={size} />;

  return null;
};

export default IconAccountPage;
