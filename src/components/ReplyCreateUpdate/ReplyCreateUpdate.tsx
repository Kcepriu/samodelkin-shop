"use client";

import { FC } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import style from "./ReplyCreateUpdate.module.css";

interface IProps {
  handlerOk: (values: IValuesFormCreateReply) => void;
  handleCancel: () => void;
}

const ReplyCreateUpdate: FC<IProps> = ({ handlerOk, handleCancel }) => {
  return (
    <div className={style.wrapComponent}>
      <h1>Відповідь на відгук.</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          content: "",
        }}
        onSubmit={(
          values: IValuesFormCreateReply,
          { setSubmitting }: FormikHelpers<IValuesFormCreateReply>
        ) => {
          handlerOk(values);
        }}
        onReset={() => {
          handleCancel();
        }}
      >
        <Form className={style.form}>
          <div className={style.wrapField}>
            <label htmlFor="firstName">Ваше імʼя</label>
            <Field
              id="firstName"
              name="firstName"
              className={style.field}
              placeholder="Введіть ваше імʼя"
            />
          </div>
          <div className={style.wrapField}>
            <label htmlFor="lastName">Ваше прізвище</label>
            <Field
              id="lastName"
              name="lastName"
              className={style.field}
              placeholder="Введіть ваше прізвище"
            />
          </div>

          <div className={style.wrapField}>
            <label htmlFor="content">Відгук</label>
            <Field
              id="content"
              name="content"
              className={style.fieldTextArea}
              as="textarea"
              placeholder="Введіть відповідь"
            />
          </div>

          <div className={style.wrapButton}>
            <button className={style.button} type="submit">
              Створити
            </button>
            <button className={style.button} type="reset">
              Відміна
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ReplyCreateUpdate;
