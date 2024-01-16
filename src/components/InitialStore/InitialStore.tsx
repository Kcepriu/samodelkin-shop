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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchFavorites(!!user, user?.jwt || "");
  //   };
  //   fetchData();
  // }, [user, fetchFavorites]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchRevised(!!user, user?.jwt || "");
  //   };

  //   fetchData();
  // }, [user, fetchRevised]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchCart(!!user);
  //   };

  //   fetchData();
  // }, [user, fetchCart]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchAboutUser(!!user, user?.jwt || "");
  //   };

  //   fetchData();
  // }, [user, fetchAboutUser]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchAboutMe(!!user, user?.jwt || "");
  //   };

  //   fetchData();
  // }, [user, fetchAboutMe]);

  return <>{children}</>;
};

export default InitialStore;
