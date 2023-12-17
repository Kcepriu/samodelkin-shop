"use client";

import { FC, useEffect } from "react";
import { FormikHelpers, useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import useAboutUser from "@/stores/aboutUser.store";
import useStore from "@/helpers/useStore";
import TextField from "@mui/material/TextField";

import style from "./ReplyCreateUpdate.module.css";

interface IProps {
  handlerOk: (values: IValuesFormCreateReply) => void;
  handleCancel: () => void;
}
interface IValue {
  firstName: string;
  lastName: string;
  content: string;
}
const emptyValue = {
  firstName: "",
  lastName: "",
  content: "",
};

const ReplyCreateUpdate: FC<IProps> = ({ handlerOk, handleCancel }) => {
  const infoAboutUser = useStore(useAboutUser, (state) => state.infoAboutUser);

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: emptyValue,
    validationSchema: validationSchema,
    onSubmit: handlerOk,
    onReset: handleCancel,
  });

  useEffect(() => {
    if (!infoAboutUser) return;

    const { contactInformation } = infoAboutUser;

    try {
      setFieldValue("firstName", contactInformation.firstName);
      setFieldValue("lastName", contactInformation.lastName);
    } catch {}
  }, [infoAboutUser, setFieldValue]);

  return (
    <div className={style.wrapComponent}>
      <h1 className={style.title}>Надіслати відповідь</h1>

      <form
        className={style.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className={style.wrapContactInformation}>
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
            className={style.wrapField}
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
            className={style.wrapField}
          />
        </div>
        <TextField
          fullWidth
          id="content"
          name="content"
          label="Відгук *"
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          multiline
          rows={10}
          error={touched.content && Boolean(errors.content)}
          helperText={touched.content && errors.content}
          className={style.wrapField}
        />

        <div className={style.wrapButton}>
          <button className={style.buttonWhite} type="reset">
            Скасувати
          </button>
          <button className={style.button} type="submit">
            Створити
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyCreateUpdate;
