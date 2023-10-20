import { FC } from "react";
// import Icons from "@/assets/iconsSpriteTest.svg";
import Icons from "@/assets/icons/Image.svg";

interface IProps {
  name: string;
  className: string;
}
const IconSvg: FC<IProps> = ({ name, className }) => {
  return (
    <svg className={className}>
      <use href={`${Icons}#icon-${name}`}></use>
    </svg>
  );
};

export default IconSvg;
