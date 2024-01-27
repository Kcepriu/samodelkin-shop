import { FC } from "react";
import style from "./ButtonMain.module.css";

interface IProps {
  text: string;
  handlerButton: () => void;
}
const ButtonMain: FC<IProps> = ({ text, handlerButton }) => {
  return (
    <div className={style.wrapButton}>
      <button
        id="btn"
        type="button"
        onClick={handlerButton}
        className={style.button}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonMain;
