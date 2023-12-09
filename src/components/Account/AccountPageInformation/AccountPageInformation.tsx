"use client";
import { FC, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FormikHelpers, useFormik } from "formik";
import TextField from "@mui/material/TextField";
import useAboutMe from "@/stores/aboutMe.store";
import useStore from "@/helpers/useStore";
import { validationSchema } from "./validationSchema";
import style from "./AccountPageInformation.module.css";

const emptyAboutMe = {
  id: 0,
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const AccountPageInformation: FC = () => {
  // * Use Store
  // * Store Info About User
  const infoAboutMe = useStore(useAboutMe, (state) => state.infoAboutMe);
  const saveAboutMe = useAboutMe((state) => state.saveAboutMe);

  // * Session
  const { data: session } = useSession();
  const user = session?.user;

  const handlerSubmitForm = async (
    values: IMyInformationFromCreate,
    { setSubmitting }: FormikHelpers<IMyInformationFromCreate>
  ) => {
    await saveAboutMe(values);
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
    initialValues: emptyAboutMe,
    validationSchema: validationSchema,
    onSubmit: handlerSubmitForm,
  });

  useEffect(() => {
    if (!infoAboutMe) return;

    try {
      setFieldValue("firstName", infoAboutMe.firstName);
      setFieldValue("lastName", infoAboutMe.lastName);
      setFieldValue("phoneNumber", infoAboutMe.phoneNumber);
    } catch {}
  }, [infoAboutMe, setFieldValue]);

  useEffect(() => {
    setFieldValue("id", user?.id);
  }, [user, setFieldValue]);

  return (
    <>
      {!!user && (
        <form className={style.form} onSubmit={handleSubmit}>
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

            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Номер телефону *"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
              className={style.inputFields}
            />

            <button type="submit" className={style.button}>
              Зберегти
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AccountPageInformation;
