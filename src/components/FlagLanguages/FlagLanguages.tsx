import { FC } from "react";
import Image from "next/image";
import { getImageFlag } from "@/helpers/getImageFlag";
import style from "./FlagLanguages.module.css";

interface IProps {
  flags: ILanguage[];
}

const FlagLanguages: FC<IProps> = ({ flags }) => {
  return (
    <ul className={style.listFlag}>
      {flags.map((flag) => {
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
