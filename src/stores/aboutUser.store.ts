import { create } from "zustand";
import { signOut } from "next-auth/react";
import { getAboutUser, saveAboutUser } from "@/services/serverActionHttp";
import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";
import {
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "@/helpers/localStorage";

interface IStateAboutUser {
  infoAboutUser: IAboutUser | null;
  isAuth: boolean;
  loading: boolean;
  error: boolean | null;
  saveAddressDelivery: (newInformation: IAboutUser) => Promise<void>;
  fetchAddressDelivery: (isRemoteStorage: boolean) => Promise<void>;
}

const useCart = create<IStateAboutUser>()((set, get) => ({
  infoAboutUser: null,
  loading: false,
  isAuth: false,
  error: null,

  saveAddressDelivery: async (newInformation: IAboutUser) => {},
  fetchAddressDelivery: async (isRemoteStorage: boolean) => {},
}));
