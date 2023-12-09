import * as Yup from "yup";
import { phoneRegExp } from "@/constants/regExp";

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(50, "Повинен бути 50 символів або менше")
    .required("Обовʼязкове поле"),

  lastName: Yup.string()
    .max(50, "Повинен бути 50 символів або менше")
    .required("Обовʼязкове поле"),

  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Не вірний формат номеру телефону")
    .required("Обовʼязкове поле"),
});
