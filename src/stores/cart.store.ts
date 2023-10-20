import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";

interface IStateCart {
  products: ICartRow[];
  loading: boolean;
  error: boolean | null;
  addToCart: (newRow: ICartRow) => Promise<void>;
  addOneProductToCart: (newProduct: IProduct) => Promise<void>;
  deleteFromCart: (newProduct: IProduct) => Promise<void>;
  cleanCart: () => Promise<void>;
}

const useCart = create<IStateCart>()(
  persist(
    (set) => ({
      products: [],
      loading: false,
      error: null,
      addToCart: async (newRow) => {
        newRow.sum = newRow.count * newRow.price;
        set((state) => ({ products: [...state.products, newRow] }));
      },

      addOneProductToCart: async (newProduct) => {
        const newRow = {
          id: newProduct.id,
          product: newProduct,
          count: 1,
          price: newProduct.attributes.price,
          sum: newProduct.attributes.price,
        };
        set((state) => ({ products: [...state.products, newRow] }));
      },

      deleteFromCart: async (newProduct) =>
        set((state) => ({
          products: state.products.filter(
            (rowCart) => rowCart.product.id !== newProduct.id
          ),
        })),

      cleanCart: async () => {
        set((state) => ({ products: [] }));
      },
    }),
    { name: KEYS_LOCAL_STORAGE.CART }
  )
);

export default useCart;
