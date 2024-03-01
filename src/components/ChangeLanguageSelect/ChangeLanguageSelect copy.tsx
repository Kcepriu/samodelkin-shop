"use client";
import { FC } from "react";
import Image from "next/image";
import { TypeLanguage } from "@/types/generalTypes/language.type";
import { getImageFlag } from "@/helpers/getImageFlag";
import Select, { components, SingleValueProps } from "react-select";
import { FaApple, FaBacon, FaCamera } from "react-icons/fa";
import * as ReactIcons from "react-icons/md";
import style from "./ChangeLanguageSelect.module.css";

interface IData {
  value: string;
  label: string;
  icon: JSX.Element;
}

interface IProps {
  innerProps: any;
  label: string;
  data: IData;
}

interface IPropsValue {
  value: string;
  label: string;
  icon: JSX.Element;
}
const iconOptions = [
  { value: "apple", label: "Apple", icon: <FaApple /> },
  { value: "banana", label: "Banana", icon: <FaBacon /> },
  { value: "cherry", label: "Cherry", icon: <FaCamera /> },
  // Додайте інші опції
];

const CustomOption = ({ innerProps, label, data }: IProps) => (
  <div {...innerProps}>
    <span>{data.icon}</span>
    {label}
  </div>
);

const CustomSingleValue = ({
  children,
  ...props
}: SingleValueProps<IPropsValue>) => (
  <components.SingleValue {...props}>
    <span>{props.data.icon}</span>
    {children}
  </components.SingleValue>
);

const ChangeLanguageSelect: FC = () => {
  return (
    <>
      <Select
        options={iconOptions}
        defaultValue={iconOptions[0]}
        classNames={{
          control: () => `${style.control}`,
          option: () => `${style.item}`,
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
