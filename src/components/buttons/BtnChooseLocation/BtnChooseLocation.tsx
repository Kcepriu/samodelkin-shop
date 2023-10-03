"use client";
import React, { FC } from "react";

type Props = {
  text: string;
  action: () => void;
};

const BtnChooseLocation: FC<Props> = ({ text, action }) => {
  return (
    <button
      type="button"
      className="px-3 border-b-2 border-dotted text-indigo-400 text-base"
      onClick={action}
    >
      {text}
    </button>
  );
};

export default BtnChooseLocation;
