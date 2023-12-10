import { create } from "zustand";
import { signOut } from "next-auth/react";
import { getAboutUser, saveAboutUser } from "@/services/serverActionHttp";
import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";
import {
  convertAboutUserToCreate,
  convertAboutUserToStore,
} from "@/helpers/convertStructuresToBac";
import {
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "@/helpers/localStorage";

interface IStateAboutUser {
  infoAboutUser: IAboutUserStore | null;
  isAuth: boolean;
  loading: boolean;
  error: boolean | null;
  saveAboutUser: (newInformation: IAboutUserStore) => Promise<void>;
  fetchAboutUser: (isRemoteStorage: boolean) => Promise<void>;
}

const saveAboutUserToStorage = async (
  newInformation: IAboutUserStore | null,
  isRemoteStorage: boolean
) => {
  if (isRemoteStorage) {
    let isAuth = true;

    if (!!newInformation) {
      ({ isAuth } = await saveAboutUser(
        convertAboutUserToCreate(newInformation)
      ));
    }

    if (!isAuth) await signOut();
    return { isAuth };
  }

  saveDataToLocalStorage(newInformation, KEYS_LOCAL_STORAGE.ABOUT_USER);
  return {
    isAuth: false,
  };
};

const fetchAboutUserFromStorage = async (
  isRemoteStorage: boolean
): Promise<{ infoAboutUser: IAboutUserStore | null; isAuth: boolean }> => {
  const aboutUserFromLocalStorage = loadDataFromLocalStorage(
    KEYS_LOCAL_STORAGE.ABOUT_USER,
    null
  );

  if (isRemoteStorage) {
    const { isAuth, aboutUser } = await getAboutUser();

    if (!isAuth) {
      await signOut();
      return { isAuth, infoAboutUser: aboutUserFromLocalStorage };
    }

    let infoAboutUser = convertAboutUserToStore(aboutUser);

    if (!!aboutUserFromLocalStorage && !infoAboutUser) {
      await saveAboutUserToStorage(aboutUserFromLocalStorage, true);
      await saveAboutUserToStorage(null, false);
      infoAboutUser = aboutUserFromLocalStorage as IAboutUserStore;
    }

    return { isAuth, infoAboutUser };
  }

  return {
    isAuth: false,
    infoAboutUser: aboutUserFromLocalStorage,
  };
};

const useAboutUser = create<IStateAboutUser>()((set, get) => ({
  infoAboutUser: null,
  loading: false,
  isAuth: false,
  error: null,

  saveAboutUser: async (newInformation: IAboutUserStore) => {
    const { isAuth } = await saveAboutUserToStorage(
      newInformation,
      get().isAuth
    );
    return set((state) => ({
      infoAboutUser: newInformation,
      isAuth: isAuth,
    }));
  },

  fetchAboutUser: async (isRemoteStorage: boolean) => {
    const { isAuth, infoAboutUser } = await fetchAboutUserFromStorage(
      isRemoteStorage
    );

    return set((state) => ({
      infoAboutUser,
      isAuth,
    }));
  },
}));

export default useAboutUser;
