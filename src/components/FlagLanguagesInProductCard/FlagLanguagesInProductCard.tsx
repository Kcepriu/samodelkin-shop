import { FC } from "react";

import Image from "next/image";
import { getImageFlag } from "@/helpers/getImageFlag";
import { defaultLanguage } from "@/constants/defaultValue.const";
import style from "./FlagLanguagesInProductCard.module.css";

interface IProps {
  flags: ILanguage[];
}

const FlagLanguagesInProductCard: FC<IProps> = ({ flags }) => {
  const newFlags = flags.length > 0 ? flags : [defaultLanguage];
  return (
    <ul className={style.listFlag}>
      {newFlags.map((flag) => {
        return (
          <li key={flag.id} className={style.element}>
            <Image
              className={style.image}
              src={getImageFlag(flag.language, true)}
              alt={flag.language}
              height={0}
              width={0}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default FlagLanguagesInProductCard;
