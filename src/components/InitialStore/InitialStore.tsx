"use client";

import { FC, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import useFavorite from "@/stores/favorite.store";
import useRevised from "@/stores/revised.store";

interface IProps {
  children: ReactNode;
}

const InitialStore: FC<IProps> = ({ children }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [fetchFavorites] = useFavorite((state) => [state.fetchFavorites]);
  const [fetchRevised] = useRevised((state) => [state.fetchRevised]);

  useEffect(() => {
    const rehydrate = async () => {
      await fetchFavorites(!!user);
      await fetchRevised(!!user);
    };

    rehydrate();
  }, [user, fetchFavorites, fetchRevised]);

  return <>{children}</>;
};

export default InitialStore;
