import { create } from "zustand";
import { getAboutMe, saveAboutMe } from "@/services/serverActionHttp";

interface IStateAboutMe {
  infoAboutMe: IMyInformationFromCreate | null;
  isError: boolean;
  isSavedOk: boolean;

  saveAboutMe: (newInformation: IMyInformationFromCreate) => Promise<void>;
  fetchAboutMe: (isAuth: boolean) => Promise<void>;
  setIsError: (isError: boolean) => void;
  setIsSavedOk: (isSavedOk: boolean) => void;
}

const useAboutMe = create<IStateAboutMe>()((set, get) => ({
  infoAboutMe: null,
  isSavedOk: false,
  isError: false,

  setIsSavedOk: (isSavedOk: boolean) => {
    return set((state) => ({
      isSavedOk,
    }));
  },

  setIsError: (isError: boolean) => {
    return set((state) => ({
      isError,
    }));
  },

  saveAboutMe: async (newInformation: IMyInformationFromCreate) => {
    let isError = false;
    if (!!newInformation) ({ isError } = await saveAboutMe(newInformation));

    return set((state) => ({
      infoAboutMe: newInformation,
      isSavedOk: !isError,
      isError,
    }));
  },

  fetchAboutMe: async (isAuth: boolean) => {
    if (!isAuth) return;

    const { infoAboutMe, isError } = await getAboutMe();

    return set((state) => ({
      infoAboutMe,
      isError,
    }));
  },
}));

export default useAboutMe;
