import { create } from "zustand";

interface IStateFavorite {
  favorites: IProduct[];
  loading: boolean;
  error: boolean | null;
  addFavorite: (newProduct: IProduct) => Promise<void>;
  deleteFavorite: (newProduct: IProduct) => Promise<void>;
}
export const useFavorite = create<IStateFavorite>()((set) => ({
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
}));
