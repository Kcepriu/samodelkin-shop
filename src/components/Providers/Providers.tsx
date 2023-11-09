"use client";

import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import InitialStore from "../InitialStore/InitialStore";

interface IProps {
  children: ReactNode;
}

const Providers: FC<IProps> = ({ children }) => {
  return (
    <SessionProvider>
      <InitialStore>{children}</InitialStore>
    </SessionProvider>
  );
};

export default Providers;
