"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { validationSchema } from "./validationSchema";

import style from "./ContactInformation.module.css";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  postOffice: string;
}

const emptyValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  postOffice: "",
};

const ContactInformation: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleGoToBach = () => {
    router.back();
  };

  const handlerSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  const { values, handleChange, handleBlur, touched, errors, setFieldValue } =
    useFormik({
      initialValues: emptyValues,
      validationSchema: validationSchema,
      onSubmit: handlerSubmit,
    });

  useEffect(() => {
    if (!values.firstName && user?.fullName)
      setFieldValue("firstName", user.fullName);
    if (!values.email && user?.email) setFieldValue("email", user.email);
  }, [user, values, setFieldValue]);

  return (
    <>
      <div className={style.wrapTitle}>
        <h1 className={style.title}>Оформлення замовлення</h1>
      </div>
      <div className={style.wrapContactInfo}>
        <h2 className={style.titleSecond}>Контактна інформація</h2>
      </div>

      <form className={style.form}>
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
        {/* Delivery */}
        <div className={style.wrapDelivery}>
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
          <div className={style.lineContacts}></div>
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
