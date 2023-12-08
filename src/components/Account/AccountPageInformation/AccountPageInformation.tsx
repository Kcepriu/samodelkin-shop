import { ReactNode, FC } from "react";
import ContactInformationDelivery from "@/components/ContactInformationDelivery/ContactInformationDelivery";

interface IProps {
  deliveryServices: IDeliveryServices[];
}

const AccountPageInformation: FC<IProps> = ({
  deliveryServices,
}): ReactNode => {
  return (
    <ContactInformationDelivery deliveryServices={deliveryServices}>
      {" "}
    </ContactInformationDelivery>
  );
};

export default AccountPageInformation;
