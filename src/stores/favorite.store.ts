"use client";

import { create } from "zustand";
import { signOut } from "next-auth/react";
import { KEYS_LOCAL_STORAGE, BACKEND_ROUTES } from "@/constants/app-keys.const";
import {
  getMarkProduct,
  saveMarkProduct,
  getProductsByList,
} from "@/services/serverActionHttp";

import {
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "@/helpers/localStorage";
import {
  convertFavoritesToCreate,
  convertProductToArrayId,
} from "@/helpers/convertStructuresToBac";

interface IStateFavoriteData {
  favorites: IProduct[];
  isAuth: boolean;
  loading: boolean;
  error: boolean | null;
}
interface IStateFavorite extends IStateFavoriteData {
  addFavorite: (newProduct: IProduct) => Promise<void>;
  deleteFavorite: (newProduct: IProduct) => Promise<void>;
  fetchFavorites: (
    isRemoteStorage: boolean,
    controller: AbortController
  ) => Promise<void>;
}

// * Save Favorite to Storage
const saveFavoriteToStorage = async (
  favorite: IProduct[],
  isRemoteStorage: boolean
) => {
  if (isRemoteStorage) {
    const { isAuth } = await saveMarkProduct(
      convertFavoritesToCreate(favorite),
      BACKEND_ROUTES.FAVORITES
    );
    if (!isAuth) await signOut();
    return { isAuth };
  }

  saveDataToLocalStorage(favorite, KEYS_LOCAL_STORAGE.FAVORITE);
  return {
    isAuth: false,
  };
};

// * fetch Favorites From Storage
const fetchFavoritesFromStorage = async (
  isRemoteStorage: boolean,
  controller: AbortController
) => {
  if (false && isRemoteStorage) {
    console.log("fetchFavoritesFromStorage - before");
    const { isAuth, markProduct: favorites } = await getMarkProduct(
      BACKEND_ROUTES.FAVORITES,
      controller
    );

    console.log("fetchFavoritesFromStorage - After", isAuth);

    if (!isAuth) await signOut();
    return { isAuth, favorites };
  }

  // const favorites = loadDataFromLocalStorage(KEYS_LOCAL_STORAGE.FAVORITE, []);
  // const productsID = convertProductToArrayId(favorites);
  // const responseFavorites = await getProductsByList(productsID);

  return {
    isAuth: false,
    // favorites: !!responseFavorites ? responseFavorites.data : favorites,
    favorites: [],
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

  fetchFavorites: async (isRemoteStorage, controller) => {
    const { isAuth, favorites } = await fetchFavoritesFromStorage(
      isRemoteStorage,
      controller
    );

    return set((state) => ({
      favorites: [...favorites],
      isAuth: isAuth,
    }));
  },
}));

export default useFavorite;
