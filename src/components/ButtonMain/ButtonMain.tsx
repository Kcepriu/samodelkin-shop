import { FC } from "react";
import style from "./ButtonMain.module.css";

interface IProps {
  text: string;
  handlerButton: () => void;
}
const ButtonMain: FC<IProps> = ({ text, handlerButton }) => {
  return (
    <button type="button" onClick={handlerButton} className={style.button}>
      {text}
    </button>
  );
};

export default ButtonMain;
