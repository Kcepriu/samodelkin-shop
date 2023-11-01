"use client";

import { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useFavorite from "@/stores/favorite.store";

interface IProps {
  children: ReactNode;
}

const InitialStore: FC<IProps> = ({ children }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [fetchFavorites] = useFavorite((state) => [state.fetchFavorites]);

  useEffect(() => {
    const rehydrate = async () => {
      await fetchFavorites(!!user);
    };

    rehydrate();
  }, [user, fetchFavorites]);

  return <>{children}</>;
};

export default InitialStore;
