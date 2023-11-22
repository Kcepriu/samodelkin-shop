"use client";
import { FC } from "react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import style from "./ButtonSignOut.module.css";

const ButtonSignOut: FC = () => {
  const handleLogOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <button
      type="button"
      onClick={handleLogOut}
      className={style.button}
      data-before={"SignOut"}
    >
      <FiLogOut size={24} />
    </button>
  );
};

export default ButtonSignOut;
