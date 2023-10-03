// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_AUTH: "SAMODELKIN_JWT_TOKEN_AUTH",
  // JWT_TOKEN_INSTRUCTOR: "SAMODELKIN_JWT_TOKEN_INSTRUCTOR",
  // ADDRESS: "ADDRESS",
  // TOKEN: "TOKEN",
};

// Backend Routes
export const BACKEND_ROUTES = {
  LOGIN: "/api/auth/local",
  CURRENT_USER: "/api/users/me",
  REGISTER: "/api/auth/local/register",
  // LOGOUT: "/user/logout",
  CATEGORIES: "/api/categories",
  PRODUCTS: "/api/products",
  COLORS: "/api/colors",
  DELIVERY_SERVICES: "/api/delivery-services",
  ORDERS: "/api/orders",
};

// Frontend routes
export const FRONTEND_ROUTES = {
  HOME: "/",
  PRODUCTS: "/product",
  PRODUCT: "/product",
  CART: "/cart",
  CHECKOUT: "/checkout",
  CONTACTS: "/contacts",
  FAVORITES: "/favorites",
  PAYMENT: "/payment_and_delivery",
  ACCOUNT: "account",
};

export const ADD_INFORMATION_ROUTES = {
  DESCRIBE: "",
  INFO: "/info",
  REVIEWS: "/reviews",
  VIDEOS: "/videos",
};

export const TYPES_ADD_INFORMATION_PRODUCT = [
  {
    title: "Опис",
    url: ADD_INFORMATION_ROUTES.DESCRIBE,
  },
  {
    title: "Характеристики",
    url: ADD_INFORMATION_ROUTES.INFO,
  },
  {
    title: "Відгуки",
    url: ADD_INFORMATION_ROUTES.REVIEWS,
  },
  {
    title: "Відео",
    url: ADD_INFORMATION_ROUTES.VIDEOS,
  },
];

export const ADD_SEARCH_PARAMS = {
  "order.data": {
    "populate[0]": "products",
    "populate[1]": "products.product.*",
    "populate[2]": "products.product.images.*",
    "populate[3]": "adresDelivery",
    "populate[4]": "adresDelivery.delivery_service",
  },
  "product.data": {
    "populate[categories]": "*",
    "populate[images]": "*",
    "populate[propertys][populate]": "*",
  },
};
