"use client";

import { FC, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import useFavorite from "@/stores/favorite.store";
import useRevised from "@/stores/revised.store";
import useCart from "@/stores/cart.store";
import useAboutUser from "@/stores/aboutUser.store";
import useAboutMe from "@/stores/aboutMe.store";

interface IProps {
  children: ReactNode;
}

const InitialStore: FC<IProps> = ({ children }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [fetchFavorites] = useFavorite((state) => [state.fetchFavorites]);
  const [fetchRevised] = useRevised((state) => [state.fetchRevised]);
  const [fetchCart] = useCart((state) => [state.fetchCart]);
  const [fetchAboutUser] = useAboutUser((state) => [state.fetchAboutUser]);
  const [fetchAboutMe] = useAboutMe((state) => [state.fetchAboutMe]);

  useEffect(() => {
    const rehydrate = async () => {
      await fetchFavorites(!!user);
      await fetchRevised(!!user);
      await fetchCart(!!user);
      await fetchAboutUser(!!user);
      await fetchAboutMe(!!user);
    };

    rehydrate();
  }, [
    user,
    fetchFavorites,
    fetchRevised,
    fetchCart,
    fetchAboutUser,
    fetchAboutMe,
  ]);

  return <>{children}</>;
};

export default InitialStore;
