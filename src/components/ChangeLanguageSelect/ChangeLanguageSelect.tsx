"use client";
import { FC } from "react";
import Image from "next/image";
import Select, {
  components,
  SingleValueProps,
  SingleValue,
  MultiValue,
} from "react-select";
import useCart from "@/stores/cart.store";
import { getImageFlag } from "@/helpers/getImageFlag";
import { defaultLanguage } from "@/constants/defaultValue.const";
import style from "./ChangeLanguageSelect.module.css";

interface ICustomOption {
  innerProps: any;
  label: string;
  data: ILanguage;
}

const CustomOption = ({ innerProps, label, data }: ICustomOption) => (
  <div {...innerProps}>
    <Image
      className={style.image}
      src={getImageFlag(data.language)}
      alt={data.language}
      width={41}
      height={32}
    />
  </div>
);

const CustomSingleValue = ({
  children,
  ...props
}: SingleValueProps<ILanguage>) => (
  <components.SingleValue {...props}>
    <Image
      className={style.image}
      src={getImageFlag(props.data.language)}
      alt={props.data.language}
      width={41}
      height={32}
    />
  </components.SingleValue>
);

interface IProps {
  rowCart: ICartRow;
}

const ChangeLanguageSelect: FC<IProps> = ({ rowCart }) => {
  const attributesProduct = rowCart.product.data.attributes;
  const currentLanguage = rowCart.language || defaultLanguage;

  const availableLanguages =
    attributesProduct?.languages.length > 0
      ? attributesProduct.languages
      : [defaultLanguage];

  const changeLanguageProduct = useCart((state) => state.changeLanguageProduct);

  const handleChangeLanguage = async (
    newValue: SingleValue<ILanguage> | MultiValue<ILanguage>
  ) => {
    if (!newValue || newValue instanceof Array) return;

    await changeLanguageProduct(rowCart.product.data, newValue);
  };

  return (
    <>
      <Select
        options={availableLanguages}
        defaultValue={currentLanguage}
        isSearchable={false}
        onChange={handleChangeLanguage}
        // menuIsOpen={true}
        menuPlacement="top"
        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
            width: "92px",
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            width: "51px",
          }),
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            padding: "4px",
            width: "51px",
          }),
        }}
        classNames={{
          option: () => `${style.item}`,
          menuList: () => `${style.menuList}`,
        }}
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue,
        }}
      />
    </>
  );
};

export default ChangeLanguageSelect;
