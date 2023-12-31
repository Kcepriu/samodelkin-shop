"use client";

import { FC, ReactNode, useEffect } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

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
    const controller = new AbortController();

    const rehydrate = async () => {
      try {
        await fetchFavorites(!!user, controller);
      } catch {}
    };

    rehydrate();

    // return () => {
    //   controller.abort();
    // };
  }, [user, fetchFavorites]);

  // useEffect(() => {
  //   const rehydrate = async () => {
  //     await fetchRevised(!!user);
  //   };

  //   rehydrate();
  // }, [user, fetchRevised]);

  // useEffect(() => {
  //   const rehydrate = async () => {
  //     await fetchCart(!!user);
  //   };

  //   rehydrate();
  // }, [user, fetchCart]);

  // useEffect(() => {
  //   const rehydrate = async () => {
  //     await fetchAboutUser(!!user);
  //   };

  //   rehydrate();
  // }, [user, fetchAboutUser]);

  // useEffect(() => {
  //   const rehydrate = async () => {
  //     await fetchAboutMe(!!user);
  //   };

  //   rehydrate();
  // }, [user, fetchAboutMe]);

  return <>{children}</>;
};

export default InitialStore;
