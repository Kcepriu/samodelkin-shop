import * as Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(50, "Повинен бути 50 символів або менше")
    .required("Обовʼязкове поле"),

  lastName: Yup.string()
    .max(50, "Повинен бути 50 символів або менше")
    .required("Обовʼязкове поле"),

  content: Yup.string()
    .max(1000, "Повинен бути не більше 1000 символів")
    .required("Обовʼязкове поле"),
});
