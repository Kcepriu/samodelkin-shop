"use client";
import { FC } from "react";
import style from "./ButtonWithMenu.module.css";

interface IProps {
  title: string;
}

const ButtonWithMenu: FC<IProps> = ({ title }) => {
  return (
    <>
      <button type="button" className={style.mainButton}>
        {title}
      </button>
    </>
  );
};

export default ButtonWithMenu;
