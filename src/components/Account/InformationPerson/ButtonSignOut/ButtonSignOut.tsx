"use client";
import { FC } from "react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const ButtonSignOut: FC = () => {
  const handleLogOut = async () => {
    await signOut();
  };
  return (
    <button type="button" onClick={handleLogOut}>
      <FiLogOut size={24} />
    </button>
  );
};

export default ButtonSignOut;
