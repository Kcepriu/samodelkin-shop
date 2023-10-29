"use client";

import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";
import { getFavorites } from "@/services/serverActionHttp";
import httpServices from "@/services/http";

interface IStateFavoriteData {
  favorites: IProduct[];
  loading: boolean;
  error: boolean | null;
}
interface IStateFavorite extends IStateFavoriteData {
  addFavorite: (newProduct: IProduct) => Promise<void>;
  deleteFavorite: (newProduct: IProduct) => Promise<void>;
}

const emptyState: IStateFavoriteData = {
  favorites: [],
  loading: false,
  error: false,
};

const get = async (name: string) => {
  const response = await getFavorites();
  // const response = await httpServices.getFavorites();
  if (!response) return null;

  const favorites = response.data[0].attributes.products.data;
  const newState = { state: { ...emptyState, favorites: favorites } };

  console.log("🚀 ~ newState:", newState);

  return favorites ? JSON.stringify(newState) : null;
};

const set = async (name: string, value: string) => {
  console.log("set", name, value);
  // console.log("Value", value);
  // return name;
};

const del = async (name: string) => {
  console.log("del");
  // return name;
};

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    // console.log(name, "with value", value, "has been saved");
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    // console.log(name, "has been deleted");
    await del(name);
  },
};

const useFavorite = create<IStateFavorite>()(
  persist(
    (set) => ({
      favorites: [],
      loading: false,
      error: null,
      addFavorite: async (newProduct) => {
        console.log("Set state");
        return set((state) => ({
          favorites: [...state.favorites, newProduct],
        }));
      },
      deleteFavorite: async (newProduct) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (product) => product.id !== newProduct.id
          ),
        })),
    }),
    {
      name: KEYS_LOCAL_STORAGE.FAVORITE,
      // storage: createJSONStorage(() => localStorage),
      storage: createJSONStorage(() => storage),
    }
  )
);

export default useFavorite;
