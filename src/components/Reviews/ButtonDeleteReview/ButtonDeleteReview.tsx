"use client";

import { FC } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import ButtonWithIcon from "@/components/ButtonWithIcon/ButtonWithIcon";

interface IProps {
  idReview: number;
}

const ButtonDeleteReview: FC<IProps> = ({ idReview }) => {
  const handleDeleteReview = () => {
    // TODO will write function deleting review
  };
  return (
    <ButtonWithIcon
      handleOnClick={handleDeleteReview}
      text=""
      Icon={RiDeleteBin2Line}
      size={18}
    />
  );
};

export default ButtonDeleteReview;
