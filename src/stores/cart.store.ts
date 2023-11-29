import { create } from "zustand";
import { signOut } from "next-auth/react";
import { getCart, saveCart } from "@/services/serverActionHttp";
import { KEYS_LOCAL_STORAGE } from "@/constants/app-keys.const";
import {
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "@/helpers/localStorage";
import { nanoid } from "nanoid";
import { convertCartToCreate } from "@/helpers/convertStructuresToBac";

interface IStateCart {
  products: ICartRow[];
  isAuth: boolean;
  loading: boolean;
  error: boolean | null;
  addOneProductToCart: (
    newProduct: IProduct,
    language: ILanguage
  ) => Promise<void>;
  changeCountProduct: (changeProduct: IProduct, count: number) => Promise<void>;
  changeLanguageProduct: (
    changeProduct: IProduct,
    language: ILanguage
  ) => Promise<void>;
  deleteFromCart: (deleteProduct: IProduct) => Promise<void>;
  cleanCart: () => Promise<void>;
  fetchCart: (isRemoteStorage: boolean) => Promise<void>;
}

const getMissingProducts = (
  productsFrom: ICartRow[],
  productsTo: ICartRow[]
): ICartRow[] => {
  const resultArr = [] as ICartRow[];

  productsFrom.forEach((rowCartFrom) => {
    const isFound = productsTo.find(
      (rowCartTo) => rowCartFrom.product.data.id === rowCartTo.product.data.id
    );

    if (isFound) return;
    resultArr.push(rowCartFrom);
  });

  return resultArr;
};

// * Save Favorite to Storage
const saveCartToStorage = async (
  products: ICartRow[],
  isRemoteStorage: boolean
) => {
  if (isRemoteStorage) {
    const { isAuth } = await saveCart(convertCartToCreate(products));
    if (!isAuth) await signOut();
    return { isAuth };
  }

  saveDataToLocalStorage(products, KEYS_LOCAL_STORAGE.CART);
  return {
    isAuth: false,
  };
};

// * fetch Favorites From Storage
const fetchCartFromStorage = async (isRemoteStorage: boolean) => {
  const productsFromLocalStorage = loadDataFromLocalStorage(
    KEYS_LOCAL_STORAGE.CART,
    []
  );

  if (isRemoteStorage) {
    let { isAuth, products } = await getCart();
    if (!isAuth) {
      await signOut();
      return { isAuth, products };
    }

    const missingProducts = getMissingProducts(
      productsFromLocalStorage,
      products
    );

    if (missingProducts.length > 0) {
      products = [...products, ...missingProducts];
      await saveCartToStorage([], false);
      await saveCartToStorage(products, true);
    }

    return { isAuth, products };
  }

  const products = loadDataFromLocalStorage(KEYS_LOCAL_STORAGE.CART, []);
  return {
    isAuth: false,
    products,
  };
};

const useCart = create<IStateCart>()((set, get) => ({
  products: [],
  loading: false,
  isAuth: false,
  error: null,

  // * Add One Product To Cart
  addOneProductToCart: async (newProduct, language) => {
    const newProducts = [...get().products];

    const index = newProducts.findIndex(
      (rowCart) => rowCart.product.data.id === newProduct.id
    );

    if (index !== -1) {
      const changeRow = newProducts[index];
      changeRow.count = +1;
      changeRow.sum = changeRow.count * changeRow.price;
    } else {
      newProducts.push({
        id: nanoid(),
        product: { data: newProduct },
        count: 1,
        price: newProduct.attributes.price,
        sum: newProduct.attributes.price,
        language: language,
      });
    }

    const { isAuth } = await saveCartToStorage(newProducts, get().isAuth);

    return set((state) => ({ products: newProducts, isAuth: isAuth }));
  },

  // * Change Count Product
  changeCountProduct: async (changeProduct, count) => {
    const newProducts = [...get().products];

    const index = newProducts.findIndex(
      (rowCart) => rowCart.product.data.id === changeProduct.id
    );

    if (index !== -1) {
      const changeRow = newProducts[index];
      changeRow.count = count;
      changeRow.sum = changeRow.count * changeRow.price;
      newProducts[index] = { ...changeRow };
    }

    const { isAuth } = await saveCartToStorage(newProducts, get().isAuth);

    return set((state) => ({
      products: newProducts,
      isAuth: isAuth,
    }));
  },
  // ! Change Language Product
  changeLanguageProduct: async (
    changeProduct: IProduct,
    language: ILanguage
  ) => {
    const newProducts = [...get().products];

    const index = newProducts.findIndex(
      (rowCart) => rowCart.product.data.id === changeProduct.id
    );

    if (index !== -1) {
      const changeRow = newProducts[index];
      changeRow.language = language;
      newProducts[index] = { ...changeRow };
    }

    const { isAuth } = await saveCartToStorage(newProducts, get().isAuth);
    return set((state) => ({
      products: newProducts,
      isAuth: isAuth,
    }));
  },

  // * Delete From Cart
  deleteFromCart: async (deleteProduct) => {
    const newProducts = get().products.filter(
      (rowCart) => rowCart.product.data.id !== deleteProduct.id
    );

    const { isAuth } = await saveCartToStorage(newProducts, get().isAuth);

    return set((state) => ({
      products: newProducts,
      isAuth: isAuth,
    }));
  },

  // * Clean Cart
  cleanCart: async () => {
    const { isAuth } = await saveCartToStorage([], get().isAuth);
    return set((state) => ({ products: [], isAuth: isAuth }));
  },

  // * Fetch Cart
  fetchCart: async (isRemoteStorage) => {
    const { isAuth, products } = await fetchCartFromStorage(isRemoteStorage);

    return set((state) => ({
      products: [...products],
      isAuth: isAuth,
    }));
  },
}));

export default useCart;
