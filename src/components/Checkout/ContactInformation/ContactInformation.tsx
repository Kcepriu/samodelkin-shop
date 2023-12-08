"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormikHelpers, useFormik } from "formik";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import TextField from "@mui/material/TextField";

import useCart from "@/stores/cart.store";
import useAboutUser from "@/stores/aboutUser.store";
import useStore from "@/helpers/useStore";
import ChoiceDelivery from "../ChoiceDelivery/ChoiceDelivery";
import AddressDeliveryService from "@/components/AddressDeliveryService/AddressDeliveryService";
import { validationSchema } from "./validationSchema";
import { convertOrderToCreate } from "@/helpers/convertStructuresToBac";
import { createOrder } from "@/services/serverActionHttp";
import { FRONTEND_ROUTES, DELIVERY_SERVICES } from "@/constants/app-keys.const";
import style from "./ContactInformation.module.css";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  idCity: string;
  postOffice: string;
  idPostOffice: string;
  comment: string;
  deliveryServicesId: number;
}

const emptyValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  idCity: "",
  postOffice: "",
  idPostOffice: "",
  comment: "",
  deliveryServicesId: 0,
};

interface IProps {
  deliveryServices: IDeliveryServices[];
}

const convertToAboutUser = (value: Values): IAboutUserStore => {
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

const ContactInformation: FC<IProps> = ({ deliveryServices }) => {
  const router = useRouter();
  // * Use Store
  // * Store Cart
  const cart = useStore(useCart, (state) => state.products) || [];
  const cleanCart = useCart((state) => state.cleanCart);
  // * Store Info About User
  const infoAboutUser = useStore(useAboutUser, (state) => state.infoAboutUser);
  const saveAboutUser = useAboutUser((state) => state.saveAboutUser);

  // * Session
  const { data: session } = useSession();
  const user = session?.user;

  const handleGoToBach = () => {
    router.back();
  };

  const handlerSubmitForm = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    await saveAboutUser(convertToAboutUser(values));

    const addressDelivery = {
      city: values.city,
      idCity: values.idCity,
      postOffice: values.postOffice,
      idPostOffice: values.idPostOffice,
      street: "",
      delivery_service: values.deliveryServicesId,
    };

    const contacts = {
      numberPhone: values.phone,
      email: values.email,
      name: `${values.firstName} ${values.lastName}`,
      comment: values.comment,
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

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: emptyValues,
    validationSchema: validationSchema,
    onSubmit: handlerSubmitForm,
  });

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
      <div className={style.wrapTitle}>
        <h1 className={style.title}>Оформлення замовлення</h1>
      </div>
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

        <div className={style.wrapDeliveryService}>
          <ChoiceDelivery
            deliveryServices={deliveryServices}
            handleChoseDelivery={handleChangeDelivery}
            activeDeliveryServicesId={values.deliveryServicesId}
          />
        </div>

        {/* Delivery */}
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
        <div className={style.wrapButton}>
          <button
            type="button"
            className={style.buttonBack}
            onClick={handleGoToBach}
          >
            <IoArrowBackCircleOutline className={style.iconBack} size={24} />
            Повернутися
          </button>

          <button type="submit" className={style.buttonCheckout}>
            Оформити замовлення
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactInformation;
