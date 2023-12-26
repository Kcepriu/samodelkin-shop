import { FC } from "react";
import Image from "next/image";
import { getImageFlag } from "@/helpers/getImageFlag";
import { defaultLanguage } from "@/constants/defaultValue.const";
import style from "./FlagLanguages.module.css";

interface IProps {
  flags: ILanguage[];
}

const FlagLanguages: FC<IProps> = ({ flags }) => {
  const newFlags = flags.length > 0 ? flags : [defaultLanguage];
  return (
    <ul className={style.listFlag}>
      {newFlags.map((flag) => {
        return (
          <li key={flag.id}>
            <Image
              // className={styles.image}
              src={getImageFlag(flag.language)}
              alt={flag.language}
              height={25}
              width={34}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default FlagLanguages;
