"use client";

import { FC } from "react";
import { IconType } from "react-icons";
import style from "./ButtonWithIcon.module.css";

interface IProps {
  Icon: IconType;
  text: string;
  handleOnClick: () => void;
  size?: number;
}

const ButtonWithIcon: FC<IProps> = ({
  Icon,
  text,
  handleOnClick,
  size = 24,
}) => {
  return (
    <button type="button" onClick={handleOnClick} className={style.button}>
      <Icon size={size} />
      {text}
    </button>
  );
};

export default ButtonWithIcon;
