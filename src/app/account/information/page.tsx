import { FC } from "react";
import httpServices from "@/services/http";
import AccountPageInformation from "@/components/Account/AccountPageInformation/AccountPageInformation";

const AccountInformation: FC = async () => {
  const deliveryServices = await httpServices.getDeliveryServices();
  return <AccountPageInformation deliveryServices={deliveryServices} />;
};

export default AccountInformation;
