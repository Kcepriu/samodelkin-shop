import { create } from "zustand";
import { getAboutMe, saveAboutMe } from "@/services/serverActionHttp";

interface IStateAboutMe {
  infoAboutMe: IMyInformationFromCreate | null;
  saveAboutMe: (newInformation: IMyInformationFromCreate) => Promise<void>;
  fetchAboutMe: (isAuth: boolean) => Promise<void>;
}

const useAboutMe = create<IStateAboutMe>()((set, get) => ({
  infoAboutMe: null,

  saveAboutMe: async (newInformation: IMyInformationFromCreate) => {
    // TODO Додати інформацію про помилку
    if (!!newInformation) await saveAboutMe(newInformation);

    return set((state) => ({
      infoAboutMe: newInformation,
    }));
  },

  fetchAboutMe: async (isAuth: boolean) => {
    if (!isAuth) return;

    const { infoAboutMe } = await getAboutMe();

    return set((state) => ({
      infoAboutMe,
    }));
  },
}));

export default useAboutMe;
