"use client";

import { FC, useEffect, ReactNode } from "react";

import { useSession } from "next-auth/react";
import { FormikHelpers, useFormik } from "formik";

import TextField from "@mui/material/TextField";

import useAboutUser from "@/stores/aboutUser.store";
import useStore from "@/helpers/useStore";
import ChoiceDelivery from "./ChoiceDelivery/ChoiceDelivery";
import AddressDeliveryService from "@/components/AddressDeliveryService/AddressDeliveryService";

import { validationSchema } from "./validationSchema";
import { DELIVERY_SERVICES } from "@/constants/app-keys.const";

import {
  IContactInformationDelivery,
  emptyContactInformationDelivery,
} from "@/types/contactInformationDelivery.types";

import { IAboutUserStore } from "@/types/aboutUser.types";

import style from "./ContactInformationDelivery.module.css";

interface IProps {
  deliveryServices: IDeliveryServices[];
  children: ReactNode;
  addHandlerSubmitForm?: (
    contactInformationDelivery: IContactInformationDelivery
  ) => void;
}

const convertToAboutUser = (
  value: IContactInformationDelivery
): IAboutUserStore => {
  return {
    contactInformation: {
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNumber: value.phone,
      email: null,
    },
    addressDelivery: {
      city: value.city,
      idCity: value.idCity,
      postOffice: value.postOffice,
      idPostOffice: value.idPostOffice,
      delivery_service: value.deliveryServicesId,
    },
  };
};

const ContactInformationDelivery: FC<IProps> = ({
  deliveryServices,
  children,
  addHandlerSubmitForm,
}) => {
  // * Use Store
  // * Store Info About User
  const infoAboutUser = useStore(useAboutUser, (state) => state.infoAboutUser);
  const saveAboutUser = useAboutUser((state) => state.saveAboutUser);

  // * Session
  const { data: session } = useSession();
  const user = session?.user;

  const handlerSubmitForm = async (
    values: IContactInformationDelivery,
    { setSubmitting }: FormikHelpers<IContactInformationDelivery>
  ) => {
    await saveAboutUser(convertToAboutUser(values));
    if (addHandlerSubmitForm) addHandlerSubmitForm(values);
  };

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: emptyContactInformationDelivery,
    validationSchema: validationSchema,
    onSubmit: handlerSubmitForm,
  });

  useEffect(() => {
    setFieldValue(
      "deliveryServicesId",
      deliveryServices.length > 0 ? deliveryServices[0].id : 0
    );
  }, [deliveryServices, setFieldValue]);

  useEffect(() => {
    if (!values.email && user?.email) setFieldValue("email", user.email);
  }, [user, values, setFieldValue]);

  useEffect(() => {
    if (!infoAboutUser) return;

    const { addressDelivery, contactInformation } = infoAboutUser;
    try {
      setFieldValue("firstName", contactInformation.firstName);
      setFieldValue("lastName", contactInformation.lastName);
      setFieldValue("phone", contactInformation.phoneNumber);
      setFieldValue("city", addressDelivery.city);
      setFieldValue("idCity", addressDelivery.idCity);
      setFieldValue("postOffice", addressDelivery.postOffice);
      setFieldValue("idPostOffice", addressDelivery.idPostOffice);
      setFieldValue("deliveryServicesId", addressDelivery.delivery_service);
    } catch {}
  }, [infoAboutUser, setFieldValue]);

  const handleChangeDelivery = async (deliveryServicesId: number) => {
    await setFieldValue("deliveryServicesId", deliveryServicesId);
    await setFieldValue("city", "");
    await setFieldValue("postOffice", "");
    await setFieldValue("idCity", "");
    await setFieldValue("idPostOffice", "");
  };

  const handleSetCity = (city: string, idCity: string) => {
    setFieldValue("city", city);
    setFieldValue("idCity", idCity);
  };

  const handleSetWarehouse = (postOffice: string, idPostOffice: string) => {
    setFieldValue("postOffice", postOffice);
    setFieldValue("idPostOffice", idPostOffice);
  };

  return (
    <>
      <div className={style.wrapContactInfo}>
        <h2 className={style.titleSecond}>Контактна інформація</h2>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        {/* Contacts */}
        <div className={style.wrapContacts}>
          <div className={style.lineContacts}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="Імʼя *"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              className={style.inputFields}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Прізвище *"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              className={style.inputFields}
            />
          </div>
          <div className={style.lineContacts}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Номер телефону *"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
              className={style.inputFields}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Електронна пошта"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              className={style.inputFields}
            />
          </div>
        </div>

        <div className={style.wrapContactInfo}>
          <h2 className={style.titleSecond}>Адреса доставки</h2>
        </div>
        {/* Delivery */}

        <div className={style.wrapDeliveryService}>
          <ChoiceDelivery
            deliveryServices={deliveryServices}
            handleChoseDelivery={handleChangeDelivery}
            activeDeliveryServicesId={values.deliveryServicesId}
          />
        </div>

        <div className={style.wrapDelivery}>
          {values.deliveryServicesId === DELIVERY_SERVICES.CURRIER && (
            <div className={style.lineContacts}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="Місто *"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                className={style.inputFields}
              />
              <TextField
                fullWidth
                id="postOffice"
                name="postOffice"
                label="Відділення *"
                value={values.postOffice}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.postOffice && Boolean(errors.postOffice)}
                helperText={touched.postOffice && errors.postOffice}
                className={style.inputFields}
              />
            </div>
          )}

          {values.deliveryServicesId === DELIVERY_SERVICES.NOVA_POSHTA && (
            <div className={style.lineContacts}>
              <AddressDeliveryService
                city={values.city}
                idCity={values.idCity}
                postOffice={values.postOffice}
                idPostOffice={values.idPostOffice}
                handleSetCity={handleSetCity}
                handleSetWarehouse={handleSetWarehouse}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </div>
          )}

          {values.deliveryServicesId === DELIVERY_SERVICES.UKR_POSHTA && (
            <div className={style.lineContacts}>
              <p>Не реалізовано</p>
            </div>
          )}

          <TextField
            fullWidth
            id="comment"
            name="comment"
            label="Коментар"
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            multiline
            rows={4}
            error={touched.comment && Boolean(errors.comment)}
            helperText={touched.comment && errors.comment}
            className={style.inputComment}
          />
        </div>

        {/* Button */}
        {children}
      </form>
    </>
  );
};

export default ContactInformationDelivery;
