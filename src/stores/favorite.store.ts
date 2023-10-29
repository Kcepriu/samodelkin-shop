"use client";

import { create } from "zustand";
import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";
import { getFavorites } from "@/services/serverActionHttp";
import { signOut } from "next-auth/react";
import {
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "@/helpers/localStorage";

interface IStateFavoriteData {
  favorites: IProduct[];
  isAuth: boolean;
  loading: boolean;
  error: boolean | null;
}
interface IStateFavorite extends IStateFavoriteData {
  addFavorite: (newProduct: IProduct) => Promise<void>;
  deleteFavorite: (newProduct: IProduct) => Promise<void>;
  fetchFavorites: (isRemoteStorage: boolean) => Promise<void>;
}

const fetchFavoritesFromStorage = async (isRemoteStorage: boolean) => {
  if (isRemoteStorage) {
    // TODO Винести дві чстини в окремі функції.
    // Оцю частину передавати як callBac функцію
    // Також треб отут робити логоут, якщо прийде код не 200
    // Глянь що буде, якщо ти розголінитись. Можливо запуститься зчитування даних,

    const { code, data: response } = await getFavorites();

    if (code === 200) {
      const favorites = !response
        ? []
        : response.data[0].attributes.products.data;

      return {
        isAuth: true,
        favorites,
      };
    } else {
      await signOut();
      return {
        isAuth: false,
        favorites: [],
      };
    }
  }

  const favorites = loadDataFromLocalStorage(KEYS_LOCAL_STORAGE.FAVORITE, []);
  return {
    isAuth: false,
    favorites,
  };
};

const useFavorite = create<IStateFavorite>()((set, get) => ({
  favorites: [],
  loading: false,
  isAuth: false,
  error: null,
  addFavorite: async (newProduct) => {
    console.log("Set state", get().isAuth);

    const newFavorites = [...get().favorites, newProduct];
    saveDataToLocalStorage(newFavorites, KEYS_LOCAL_STORAGE.FAVORITE);

    return set((state) => ({
      favorites: newFavorites,
    }));
  },

  deleteFavorite: async (newProduct) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (product) => product.id !== newProduct.id
      ),
    })),

  fetchFavorites: async (isRemoteStorage) => {
    const { isAuth, favorites } = await fetchFavoritesFromStorage(
      isRemoteStorage
    );

    return set((state) => ({
      favorites: [...favorites],
      isAuth: isAuth,
    }));
  },
}));

export default useFavorite;
