"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { getImageFlag } from "@/helpers/getImageFlag";
import { defaultLanguage } from "@/constants/defaultValue.const";
import useCart from "@/stores/cart.store";
import style from "./ChangeLanguage.module.css";

interface IProps {
  rowCart: ICartRow;
}
const ChangeLanguage: FC<IProps> = ({ rowCart }) => {
  const attributesProduct = rowCart.product.data.attributes;
  const currentLanguage = rowCart.language || defaultLanguage;

  const availableLanguages =
    attributesProduct?.languages.length > 0
      ? attributesProduct.languages
      : [defaultLanguage];

  const changeLanguageProduct = useCart((state) => state.changeLanguageProduct);

  const handleChangeLanguage = async (selectedLanguage: ILanguage) => {
    await changeLanguageProduct(rowCart.product.data, selectedLanguage);
  };

  return (
    <ul className={style.listFlag}>
      {availableLanguages.map((language) => {
        return (
          <li
            key={language.id}
            data-selected={currentLanguage.language === language.language}
            className={style.flag}
            onClick={() => handleChangeLanguage(language)}
          >
            <Image
              className={style.image}
              src={getImageFlag(language.language)}
              alt={language.language}
              height={25}
              width={34}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ChangeLanguage;
