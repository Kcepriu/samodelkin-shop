import { create } from "zustand";

interface IStateOnPageNotFound {
  isOnPageNotFound: boolean;
  setOnPageNotFound: (isOnPageNotFound: boolean) => void;
}

const useOnPageNotFound = create<IStateOnPageNotFound>()((set, get) => ({
  isOnPageNotFound: false,

  setOnPageNotFound: (isOnPageNotFound: boolean) => {
    return set((state) => ({
      isOnPageNotFound,
    }));
  },
}));

export default useOnPageNotFound;
