import { FC } from "react";
import style from "./ButtonLoadMore.module.css";

interface IProps {
  handleLoadMore: () => void;
  text: string;
}
const ButtonLoadMore: FC<IProps> = ({ handleLoadMore, text }) => {
  return (
    <>
      <button className={style.button} type="button" onClick={handleLoadMore}>
        {text}
      </button>
    </>
  );
};

export default ButtonLoadMore;
