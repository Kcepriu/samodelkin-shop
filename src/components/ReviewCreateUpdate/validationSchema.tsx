import * as Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(50, "Повинен бути 50 символів або менше")
    .required("Обовʼязкове поле"),

  lastName: Yup.string().max(50, "Повинен бути 50 символів або менше"),
  content: Yup.string()
    .max(1000, "Повинен бути не більше 1000 символів")
    .required("Обовʼязкове поле"),

  advantages: Yup.string().max(1000, "Повинен бути не більше 100 символів"),
  disAdvantages: Yup.string().max(1000, "Повинен бути не більше 100 символів"),
  rating: Yup.number()
    .min(1, "Повинен бути більшим за 0")
    .max(5, "Повинен бути не більше 5")
    .required("Обовʼязкове поле"),
  product: Yup.number()
    .min(1, "Потрібно вибрати товар")
    .required("Обовʼязкове поле"),
});
