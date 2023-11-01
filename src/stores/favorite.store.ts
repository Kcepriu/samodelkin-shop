"use client";

import { create } from "zustand";
import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";
import { getFavorites, saveFavorites } from "@/services/serverActionHttp";
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

const convertFavoritesToCreate = (
  favorites: IProduct[]
): IFavoriteForCreate => {
  const products = favorites.map((element) => element.id);
  return {
    data: { products },
  };
};

// * Save Favorite to Storage
const saveFavoriteToStorage = async (
  favorite: IProduct[],
  isRemoteStorage: boolean
) => {
  if (isRemoteStorage) {
    const { isAuth } = await saveFavorites(convertFavoritesToCreate(favorite));
    if (!isAuth) await signOut();
    return { isAuth };
  }

  saveDataToLocalStorage(favorite, KEYS_LOCAL_STORAGE.FAVORITE);
  return {
    isAuth: false,
  };
};

// * fetch Favorites From Storage
const fetchFavoritesFromStorage = async (isRemoteStorage: boolean) => {
  if (isRemoteStorage) {
    const { isAuth, favorites } = await getFavorites();
    if (!isAuth) await signOut();
    return { isAuth, favorites };
  }

  const favorites = loadDataFromLocalStorage(KEYS_LOCAL_STORAGE.FAVORITE, []);
  return {
    isAuth: false,
    favorites,
  };
};

// * Create Store
const useFavorite = create<IStateFavorite>()((set, get) => ({
  favorites: [],
  loading: false,
  isAuth: false,
  error: null,
  addFavorite: async (newProduct) => {
    const newFavorites = [...get().favorites, newProduct];
    const { isAuth } = await saveFavoriteToStorage(newFavorites, get().isAuth);

    return set((state) => ({
      favorites: newFavorites,
      isAuth: isAuth,
    }));
  },

  deleteFavorite: async (newProduct) => {
    const newFavorites = get().favorites.filter(
      (product) => product.id !== newProduct.id
    );

    const { isAuth } = await saveFavoriteToStorage(newFavorites, get().isAuth);

    return set((state) => ({
      favorites: newFavorites,
      isAuth: isAuth,
    }));
  },

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
