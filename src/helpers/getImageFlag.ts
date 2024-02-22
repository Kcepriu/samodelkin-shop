import uaFlag from "@/assets/icons/ua.png";
import usFlag from "@/assets/icons/us.png";
import ruFlag from "@/assets/icons/ru.png";

import uaFlagCircle from "@/assets/icons/ua_circle.png";
import usFlagCircle from "@/assets/icons/us_circle.png";
import ruFlagCircle from "@/assets/icons/ru_circle.png";

import { TypeLanguage } from "@/types/generalTypes/language.type";

export const getImageFlag = (
  nameLanguages: TypeLanguage | undefined,
  circle = false
) => {
  if (circle) {
    if (!nameLanguages) return uaFlagCircle;
    if (nameLanguages === TypeLanguage.UA) return uaFlagCircle;
    if (nameLanguages === TypeLanguage.US) return usFlagCircle;
    if (nameLanguages === TypeLanguage.RU) return ruFlagCircle;
  }

  if (!nameLanguages) return uaFlag;
  if (nameLanguages === TypeLanguage.UA) return uaFlag;
  if (nameLanguages === TypeLanguage.US) return usFlag;
  if (nameLanguages === TypeLanguage.RU) return ruFlag;
  return uaFlag;
};
