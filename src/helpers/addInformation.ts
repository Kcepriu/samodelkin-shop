import { FRONTEND_ROUTES } from "@/constants/app-keys.const";

export const getUrlAddInformation = (typeInformation: string, slug: string) => {
  return `${FRONTEND_ROUTES.PRODUCT}/${slug}${typeInformation}`;
};
