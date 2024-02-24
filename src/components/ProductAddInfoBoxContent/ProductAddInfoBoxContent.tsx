import { FC } from "react";
import style from "./ProductAddInfoBoxContent.module.css";
import { PiDiceSix } from "react-icons/pi";

interface IProps {
  boxContent: string;
}
const ProductAddInfoBoxContent: FC<IProps> = ({ boxContent }) => {
  return (
    <ul className={style.wrapContent}>
      {boxContent.split("\n").map((line, index) => {
        return (
          <li key={index} className={style.line}>
            <PiDiceSix size={24} className={style.icon} />
            <p>{line}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductAddInfoBoxContent;
