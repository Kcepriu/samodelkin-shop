"use client";
import { FC, useEffect } from "react";
import { FormikHelpers, useFormik } from "formik";
import { TextField, Rating, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import useAboutMe from "@/stores/aboutMe.store";
import useStore from "@/helpers/useStore";
import { validationSchema } from "./validationSchema";
import style from "./ReviewCreateUpdate.module.css";

interface IProps {
  product: IProduct;
  handlerOk: (values: IValuesFormCreateReview) => void;
  handleCancel: () => void;
}

const emptyReview = {
  firstName: "",
  lastName: "",
  rating: 5,
  content: "",
  advantages: "",
  disAdvantages: "",
  product: 0,
};

const ReviewCreateUpdate: FC<IProps> = ({
  product,
  handlerOk,
  handleCancel,
}) => {
  const infoAboutMe = useStore(useAboutMe, (state) => state.infoAboutMe);

  const handlerSubmitForm = async (
    values: IValuesFormCreateReview,
    { setSubmitting }: FormikHelpers<IValuesFormCreateReview>
  ) => {
    await handlerOk(values);
  };

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
    initialValues: emptyReview,
    validationSchema: validationSchema,
    onSubmit: handlerSubmitForm,
    onReset: handleCancel,
  });

  useEffect(() => {
    if (!infoAboutMe) return;

    try {
      setFieldValue("firstName", infoAboutMe.firstName);
      setFieldValue("lastName", infoAboutMe.lastName);
    } catch {}
  }, [infoAboutMe, setFieldValue]);

  useEffect(() => {
    if (!product) return;
    try {
      setFieldValue("product", product.id);
    } catch {}
  }, [product, setFieldValue]);

  return (
    <div className={style.wrapComponent}>
      <h1 className={style.title}>{product.attributes.title}</h1>

      <form
        className={style.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className={style.wrapRating}>
          <Rating
            name="hover-feedback"
            value={values.rating}
            precision={1}
            icon={<StarIcon className={style.icon} />}
            emptyIcon={<StarOutlineIcon className={style.icon} />}
            onChange={(event, newValue) => {
              setFieldValue("rating", newValue);
            }}
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

        <TextField
          fullWidth
          id="disAdvantages"
          name="disAdvantages"
          label="Переваги"
          value={values.disAdvantages}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.disAdvantages && Boolean(errors.disAdvantages)}
          helperText={touched.disAdvantages && errors.disAdvantages}
          className={style.inputFields}
        />

        <TextField
          fullWidth
          id="advantages"
          name="advantages"
          label="Недоліки"
          value={values.advantages}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.advantages && Boolean(errors.advantages)}
          helperText={touched.advantages && errors.advantages}
          className={style.inputFields}
        />

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

export default ReviewCreateUpdate;
