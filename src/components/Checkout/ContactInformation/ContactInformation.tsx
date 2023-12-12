"use client";

import { FC } from "react";
import ContactInformationDelivery from "@/components/ContactInformationDelivery/ContactInformationDelivery";
import ButtonsCheckout from "@/components/Checkout/ButtonsCheckout/ButtonsCheckout";
import useCreateOrder from "@/hooks/useCreateOrder";
import style from "./ContactInformation.module.css";

interface IProps {
  deliveryServices: IDeliveryServices[];
}

const ContactInformation: FC<IProps> = ({ deliveryServices }) => {
  const { createOrderFromForm } = useCreateOrder();
  return (
    <>
      <div className={style.wrapTitle}>
        <h1 className={style.title}>Оформлення замовлення</h1>
      </div>
      <ContactInformationDelivery
        deliveryServices={deliveryServices}
        addHandlerSubmitForm={createOrderFromForm}
      >
        <ButtonsCheckout />
      </ContactInformationDelivery>
    </>
  );
};

export default ContactInformation;
