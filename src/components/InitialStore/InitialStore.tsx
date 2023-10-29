"use client";

import { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useFavorite from "@/stores/favorite.store";
import { createJSONStorage } from "zustand/middleware";

interface IProps {
  children: ReactNode;
}

const InitialStore: FC<IProps> = ({ children }) => {
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const rehydrate = async () => {
      console.log("🚀 ~ rehydrate:");
      console.log(useFavorite.persist.getOptions().storage);

      await useFavorite.persist.rehydrate();
    };

    // if (!user) {
    //   useFavorite.persist.setOptions({
    //     storage: createJSONStorage(() => sessionStorage),
    //   });
    //   rehydrate();
    // } else {
    //   useFavorite.persist.setOptions({
    //     storage: undefined,
    //   });
    // }
  }, [user]);

  return <>{children}</>;
};

export default InitialStore;
