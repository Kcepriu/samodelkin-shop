"use client";

import { FC, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import useFavorite from "@/stores/favorite.store";
import useRevised from "@/stores/revised.store";
import useCart from "@/stores/cart.store";

interface IProps {
  children: ReactNode;
}

const InitialStore: FC<IProps> = ({ children }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [fetchFavorites] = useFavorite((state) => [state.fetchFavorites]);
  const [fetchRevised] = useRevised((state) => [state.fetchRevised]);
  const [fetchCart] = useCart((state) => [state.fetchCart]);

  useEffect(() => {
    const rehydrate = async () => {
      await fetchFavorites(!!user);
      await fetchRevised(!!user);
      await fetchCart(!!user);
    };

    rehydrate();
  }, [user, fetchFavorites, fetchRevised, fetchCart]);

  return <>{children}</>;
};

export default InitialStore;
