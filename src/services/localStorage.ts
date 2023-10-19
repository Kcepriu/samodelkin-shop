import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";

export const readFavorite = async (): Promise<IProduct[]> => {
  let favorites = [];
  try {
    const data: string | null = localStorage.getItem(
      KEYS_LOCAL_STORAGE.FAVORITE
    );
    if (data) favorites = JSON.parse(data);
  } catch {
    favorites = [];
  }

  return favorites;
};

export const saveFavorites = async (favorites: IProduct[]) => {
  try {
    const serializedState = JSON.stringify(favorites);
    localStorage.setItem(KEYS_LOCAL_STORAGE.FAVORITE, serializedState);
  } catch (Error) {
    // console.error("Set state error: ", Error);
  }
};
