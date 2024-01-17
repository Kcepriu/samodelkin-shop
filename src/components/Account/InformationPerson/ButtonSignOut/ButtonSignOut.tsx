"use client";
import { FC } from "react";
import { signOut } from "next-auth/react";
import { PiArrowSquareOut } from "react-icons/pi";
import { useSession } from "next-auth/react";
import style from "./ButtonSignOut.module.css";

const ButtonSignOut: FC = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!user) return <></>;

  return (
    <button
      type="button"
      onClick={handleLogOut}
      className={style.button}
      data-before={"SignOut"}
    >
      <PiArrowSquareOut size={24} />
      Вийти
    </button>
  );
};

export default ButtonSignOut;
