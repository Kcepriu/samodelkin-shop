"use client";

import { create } from "zustand";
import { signOut } from "next-auth/react";
import { KEYS_LOCAL_STORAGE, BACKEND_ROUTES } from "@/constants/app-keys.const";
import { getMarkProduct, saveMarkProduct } from "@/services/serverActionHttp";

import {
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "@/helpers/localStorage";

interface IStateRevisedData {
  revised: IProduct[];
  isAuth: boolean;
  loading: boolean;
  error: boolean | null;
}
interface IStateRevised extends IStateRevisedData {
  addRevised: (newProduct: IProduct) => Promise<void>;
  deleteRevised: (newProduct: IProduct) => Promise<void>;
  fetchRevised: (isRemoteStorage: boolean) => Promise<void>;
}

const convertRevisedToCreate = (revised: IProduct[]): IMarkProductForCreate => {
  const products = revised.map((element) => element.id);
  return {
    data: { products },
  };
};

// * Save Revised to Storage
const saveRevisedToStorage = async (
  revised: IProduct[],
  isRemoteStorage: boolean
) => {
  if (isRemoteStorage) {
    const { isAuth } = await saveMarkProduct(
      convertRevisedToCreate(revised),
      BACKEND_ROUTES.FAVORITES
    );
    if (!isAuth) await signOut();
    return { isAuth };
  }

  saveDataToLocalStorage(revised, KEYS_LOCAL_STORAGE.REVISED);
  return {
    isAuth: false,
  };
};

// * fetch Revised From Storage
const fetchRevisedFromStorage = async (isRemoteStorage: boolean) => {
  if (isRemoteStorage) {
    const { isAuth, markProduct: revised } = await getMarkProduct(
      BACKEND_ROUTES.FAVORITES
    );
    if (!isAuth) await signOut();
    return { isAuth, revised };
  }

  const revised = loadDataFromLocalStorage(KEYS_LOCAL_STORAGE.REVISED, []);
  return {
    isAuth: false,
    revised,
  };
};

// * Create Store
const useRevised = create<IStateRevised>()((set, get) => ({
  revised: [],
  loading: false,
  isAuth: false,
  error: null,
  addRevised: async (newProduct) => {
    const newRevised = [...get().revised, newProduct];
    const { isAuth } = await saveRevisedToStorage(newRevised, get().isAuth);

    return set((state) => ({
      revised: newRevised,
      isAuth: isAuth,
    }));
  },

  deleteRevised: async (newProduct) => {
    const newRevised = get().revised.filter(
      (product) => product.id !== newProduct.id
    );

    const { isAuth } = await saveRevisedToStorage(newRevised, get().isAuth);

    return set((state) => ({
      revised: newRevised,
      isAuth: isAuth,
    }));
  },

  fetchRevised: async (isRemoteStorage) => {
    const { isAuth, revised } = await fetchRevisedFromStorage(isRemoteStorage);

    return set((state) => ({
      revised: [...revised],
      isAuth: isAuth,
    }));
  },
}));

export default useRevised;
