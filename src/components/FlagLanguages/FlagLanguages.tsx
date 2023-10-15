import { FC } from "react";
import Image from "next/image";
import uaFlag from "@/assets/icons/ua.png";
import usFlag from "@/assets/icons/us.png";
import ruFlag from "@/assets/icons/ru.png";
import style from "./FlagLanguages.module.css";

interface IProps {
  flags: ILanguage[];
}

function getFlag(languages: "ua" | "ru" | "us") {
  if (languages === "ua") return uaFlag;
  if (languages === "us") return usFlag;
  if (languages === "ru") return ruFlag;
  return uaFlag;
}

const FlagLanguages: FC<IProps> = ({ flags }) => {
  return (
    <ul className={style.listFlag}>
      {flags.map((flag) => {
        return (
          <li key={flag.id}>
            <Image
              // className={styles.image}
              src={getFlag(flag.language)}
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
