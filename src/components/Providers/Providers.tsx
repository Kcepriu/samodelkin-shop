"use client";

import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface IProps {
  children: ReactNode;
}

const Providers: FC<IProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
