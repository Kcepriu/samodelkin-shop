"use client";

import { FC } from "react";
import ContactInformationDelivery from "@/components/ContactInformationDelivery/ContactInformationDelivery";
import ButtonsCheckout from "@/components/Checkout/ButtonsCheckout/ButtonsCheckout";
import useCreateOrder from "@/hooks/useCreateOrder";

interface IProps {
  deliveryServices: IDeliveryServices[];
}

const ContactInformation: FC<IProps> = ({ deliveryServices }) => {
  const { createOrderFromForm } = useCreateOrder();
  return (
    <ContactInformationDelivery
      deliveryServices={deliveryServices}
      addHandlerSubmitForm={createOrderFromForm}
    >
      <ButtonsCheckout />
    </ContactInformationDelivery>
  );
};

export default ContactInformation;
