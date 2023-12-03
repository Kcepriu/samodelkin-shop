"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormikHelpers, useFormik } from "formik";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import ChoiceDelivery from "../ChoiceDelivery/ChoiceDelivery";
import { validationSchema } from "./validationSchema";
import { convertOrderToCreate } from "@/helpers/convertStructuresToBac";
import AddressDeliveryService from "@/components/AddressDeliveryService/AddressDeliveryService";
import { createOrder } from "@/services/serverActionHttp";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
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

const ContactInformation: FC<IProps> = ({ deliveryServices }) => {
  const router = useRouter();
  const cart = useStore(useCart, (state) => state.products) || [];

  const options = ["Option 1", "Option 2"];
  const [value, setValue] = useState<string | null>("");
  const [inputValue, setInputValue] = useState("");

  const cleanCart = useCart((state) => state.cleanCart);

  const { data: session } = useSession();

  const user = session?.user;

  const handleGoToBach = () => {
    router.back();
  };

  const handlerSubmitForm = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const addressDelivery = {
      city: values.city,
      branchNumber: values.postOffice,
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
    if (!values.firstName && user?.fullName)
      setFieldValue("firstName", user.fullName);
    if (!values.email && user?.email) setFieldValue("email", user.email);
  }, [user, values, setFieldValue]);

  useEffect(() => {
    if (deliveryServices.length > 0)
      setFieldValue("deliveryServicesId", deliveryServices[0].id || 0);
  }, [deliveryServices, setFieldValue]);

  const handleChangeDelivery = (deliveryServicesId: number) => {
    // TODO Here need change API delivery cervices
    setFieldValue("deliveryServicesId", deliveryServicesId);
    setFieldValue("city", "");
    setFieldValue("postOffice", "");
    setFieldValue("idCity", "");
    setFieldValue("idPostOffice", "");
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
      <div>
        <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>
        <br />
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Controllable" />
          )}
        />
      </div>
      {/* ----------------------------------------------- */}
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
          <div className={style.lineContacts}>
            <AddressDeliveryService
              selectedCity={null}
              selectedWarehouses={null}
              handleSetCity={handleSetCity}
              handleSetWarehouse={handleSetWarehouse}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
          </div>
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
