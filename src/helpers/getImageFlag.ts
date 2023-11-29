import uaFlag from "@/assets/icons/ua.png";
import usFlag from "@/assets/icons/us.png";
import ruFlag from "@/assets/icons/ru.png";
import { TypeLanguage } from "@/types/generalTypes/language.type";

export const getImageFlag = (nameLanguages: TypeLanguage | undefined) => {
  if (!nameLanguages) return uaFlag;
  if (nameLanguages === TypeLanguage.UA) return uaFlag;
  if (nameLanguages === TypeLanguage.US) return usFlag;
  if (nameLanguages === TypeLanguage.RU) return ruFlag;
  return uaFlag;
};
