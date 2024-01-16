import { create } from "zustand";
import { saveAboutMe, getAboutMe } from "@/services/serverActionHttp";
import { IMyInformationFromCreate } from "@/types/aboutUser.types";
// import httpClientServices from "@/services/httpClient";

interface IStateAboutMe {
  infoAboutMe: IMyInformationFromCreate | null;
  isError: boolean;
  isSavedOk: boolean;

  saveAboutMe: (newInformation: IMyInformationFromCreate) => Promise<void>;
  fetchAboutMe: (isAuth: boolean, accessToken: string) => Promise<void>;
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

  fetchAboutMe: async (isAuth: boolean, accessToken: string) => {
    if (!isAuth) return;

    const { infoAboutMe, isError } = await getAboutMe();
    // const { infoAboutMe, isError } = await httpClientServices.getAboutMe(
    //   accessToken
    // );

    return set((state) => ({
      infoAboutMe,
      isError,
    }));
  },
}));

export default useAboutMe;
