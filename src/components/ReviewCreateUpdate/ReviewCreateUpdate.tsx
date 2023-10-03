"use client";
import { FC } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import style from "./ReviewCreateUpdate.module.css";

interface Values {
  userName: string;
  rating: number;
  content: string;
  advantages: string;
  disAdvantages: string;
}

interface IProps {
  product: IProduct;
  handlerOk: () => void;
  handleCancel: () => void;
}
const ReviewCreateUpdate: FC<IProps> = ({
  product,
  handlerOk,
  handleCancel,
}) => {
  return (
    <div className={style.wrapComponent}>
      <h1>Відгук на товар: {product.attributes.title}</h1>
      <Formik
        initialValues={{
          userName: "",
          rating: 5,
          content: "",
          advantages: "",
          disAdvantages: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          alert(JSON.stringify(values, null, 2));
          handlerOk();
        }}
        onReset={() => {
          handleCancel();
        }}
      >
        <Form className={style.form}>
          <div className={style.wrapField}>
            <label htmlFor="userName">Ваше імʼя</label>
            <Field
              id="userName"
              name="userName"
              className={style.field}
              placeholder="Введіть ваше імʼя і прізвище"
            />
          </div>

          <div className={style.wrapField}>
            <label htmlFor="content">Відгук</label>
            <Field
              id="content"
              name="content"
              className={style.fieldTextArea}
              as="textarea"
              placeholder="Введіть відгук на товар"
            />
          </div>

          <div className={style.wrapField}>
            <label htmlFor="advantages">Переваги</label>
            <Field
              id="advantages"
              name="advantages"
              className={style.field}
              placeholder="Вкажіть переваги товару"
            />
          </div>

          <div className={style.wrapField}>
            <label htmlFor="disAdvantages">Недоліки</label>
            <Field
              id="disAdvantages"
              name="disAdvantages"
              className={style.field}
              placeholder="Вкажіть недоліки"
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

export default ReviewCreateUpdate;
