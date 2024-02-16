"use client";

import { FC, useEffect } from "react";
import { PiFadersHorizontal, PiCaretLeft } from "react-icons/pi";

import Filters from "../Filters/Filters";
import useMobileMenu from "@/hooks/useMobileMenu";
import style from "./ButtonOpenMobileFilters.module.css";

interface IProps {
  filters: IFilter[] | undefined;
}

const ButtonOpenMobileFilters: FC<IProps> = ({ filters }) => {
  const contentComponent = (
    <div className={style.wrapContent}>
      <button
        type="button"
        className={style.buttonTitle}
        onClick={() => setShowMobileMenu(false)}
      >
        <PiCaretLeft size={24} />
        Фільтри
      </button>
      <Filters filters={filters} />
    </div>
  );

  const { ModalMenuComponent, setShowMobileMenu } = useMobileMenu({
    contentComponent,
    isShowButtonCloseWindow: false,
  });

  useEffect(() => {
    setShowMobileMenu(false);
  }, [filters, setShowMobileMenu]);

  return (
    <>
      <button
        type="button"
        className={style.button}
        onClick={() => setShowMobileMenu(true)}
      >
        <PiFadersHorizontal size={16} />
        Фільтри
      </button>
      {ModalMenuComponent}
    </>
  );
};

export default ButtonOpenMobileFilters;
