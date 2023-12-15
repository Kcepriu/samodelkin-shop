"use client";

import { FC } from "react";
import { IconType } from "react-icons";
import style from "./ButtonWithIcon.module.css";

interface IProps {
  Icon: IconType;
  text: string;
  handleOnClick: () => void;
}

const ButtonWithIcon: FC<IProps> = ({ Icon, text, handleOnClick }) => {
  return (
    <button type="button" onClick={handleOnClick} className={style.button}>
      <Icon size={24} />
      {text}
    </button>
  );
};

export default ButtonWithIcon;
