import { FC } from "react";
import Image from "next/image";
import { getImageFlag } from "@/helpers/getImageFlag";

interface IProps {
  currentLanguages: ILanguage;
  availableLanguages: ILanguage[];
  onlyView?: boolean;
}
const ChangeLanguage: FC<IProps> = ({
  currentLanguages,
  availableLanguages,
  onlyView = true,
}) => {
  return (
    <>
      <Image
        // className={styles.image}
        src={getImageFlag(currentLanguages?.language)}
        alt={currentLanguages?.language || "ua"}
        height={25}
        // width={34}
      />
    </>
  );
};

export default ChangeLanguage;
