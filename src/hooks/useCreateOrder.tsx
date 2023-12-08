"use client";

import { useRouter } from "next/navigation";
import useStore from "@/helpers/useStore";
import useCart from "@/stores/cart.store";
import { IContactInformationDelivery } from "@/types/contactInformationDelivery.types";
import { convertOrderToCreate } from "@/helpers/convertStructuresToBac";
import { createOrder } from "@/services/serverActionHttp";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";

const useCreateOrder = () => {
  const router = useRouter();
  // * Store Cart
  const cart = useStore(useCart, (state) => state.products) || [];
  const cleanCart = useCart((state) => state.cleanCart);

  const createOrderFromForm = async (
    contactInformationDelivery: IContactInformationDelivery
  ) => {
    const addressDelivery = {
      city: contactInformationDelivery.city,
      idCity: contactInformationDelivery.idCity,
      postOffice: contactInformationDelivery.postOffice,
      idPostOffice: contactInformationDelivery.idPostOffice,
      street: "",
      delivery_service: contactInformationDelivery.deliveryServicesId,
    };

    const contacts = {
      numberPhone: contactInformationDelivery.phone,
      email: contactInformationDelivery.email,
      name: `${contactInformationDelivery.firstName} ${contactInformationDelivery.lastName}`,
      comment: contactInformationDelivery.comment,
    };

    const convertData = convertOrderToCreate({
      products: cart,
      contacts,
      addressDelivery,
    });

    const { order } = await createOrder(convertData);

    if (!!order) {
      await cleanCart();
      router.replace(FRONTEND_ROUTES.PRODUCT);
    }
  };
  return { createOrderFromForm };
};

export default useCreateOrder;
