import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";
interface IStateFavorite {
  favorites: IProduct[];
  loading: boolean;
  error: boolean | null;
  addFavorite: (newProduct: IProduct) => Promise<void>;
  deleteFavorite: (newProduct: IProduct) => Promise<void>;
}
const useFavorite = create<IStateFavorite>()(
  persist(
    (set) => ({
      favorites: [],
      loading: false,
      error: null,
      addFavorite: async (newProduct) =>
        set((state) => ({ favorites: [...state.favorites, newProduct] })),
      deleteFavorite: async (newProduct) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (product) => product.id !== newProduct.id
          ),
        })),
    }),
    { name: KEYS_LOCAL_STORAGE.FAVORITE }
  )
);

export default useFavorite;
