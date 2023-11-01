import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";

interface IStateCart {
  products: ICartRow[];
  loading: boolean;
  error: boolean | null;
  addToCart: (newRow: ICartRow) => Promise<void>;
  addOneProductToCart: (newProduct: IProduct) => Promise<void>;
  changeCountProduct: (changeProduct: IProduct, count: number) => Promise<void>;
  deleteFromCart: (deleteProduct: IProduct) => Promise<void>;
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

      changeCountProduct: async (changeProduct, count) => {
        const newRow = {
          id: changeProduct.id,
          product: changeProduct,
          count: count,
          price: changeProduct.attributes.price,
          sum: changeProduct.attributes.price * count,
        };

        set((state) => {
          const products = state.products;
          const index = products.findIndex(
            (rowCart) => rowCart.id === changeProduct.id
          );

          if (index !== -1) products[index] = newRow;

          return {
            products: [...products],
          };
        });
      },

      deleteFromCart: async (deleteProduct) =>
        set((state) => ({
          products: state.products.filter(
            (rowCart) => rowCart.id !== deleteProduct.id
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
