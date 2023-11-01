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
  ABOUT_US: "/api/about-us-section",
  CATEGORY_DESCRIPTION: "/api/category-descriptions",
  PRODUCT_DESCRIPTION: "/api/product-descriptions",
  REVIEWS: "/api/reviews",
  LAST_REVIEWS: "/api/lastReviews",
  REPLY_TO_REVIEWS: "/api/replyToReview",
  CHANGE_STATUS_REVIEWS: "/api/changeStatusReview",
  CHANGE_REPLY_TO_REVIEWS: "/api/changeReplyToReview",
  FAVORITES: "/api/favorites",
  REVISED: "/api/reviseds",
};

// Frontend routes
export const FRONTEND_ROUTES = {
  HOME: "/",
  PRODUCTS: "/product",
  PRODUCT: "/product",
  CHECKOUT: "/checkout",
  ABOUT_US: "/about_us",
  CONTACTS: "/contacts",
  DELIVERY: "/delivery",
  CHANGE: "/change",
  ACCOUNT: "/account",
  SIGNIN: "/api/auth/signin",
};

export const PRODUCT_ADD_INFORMATION_ROUTES = {
  DESCRIBE: "",
  INFO: "/info",
  REVIEWS: "/reviews",
  VIDEOS: "/videos",
  MANUALS: "/manuals",
};

export const TYPES_PRODUCT_ADD_INFORMATION = [
  {
    title: "Опис",
    url: PRODUCT_ADD_INFORMATION_ROUTES.DESCRIBE,
  },
  {
    title: "Характеристики",
    url: PRODUCT_ADD_INFORMATION_ROUTES.INFO,
  },
  {
    title: "Відгуки",
    url: PRODUCT_ADD_INFORMATION_ROUTES.REVIEWS,
  },
  {
    title: "Відео",
    url: PRODUCT_ADD_INFORMATION_ROUTES.VIDEOS,
  },
  {
    title: "Інструкції",
    url: PRODUCT_ADD_INFORMATION_ROUTES.MANUALS,
  },
];

export const KEYS_LOCAL_STORAGE = {
  FAVORITE: "FAVORITE_PRODUCT",
  CART: "CART_SHOP",
  REVISED: "REVISED_PRODUCT",
};

export const ACCOUNT_ADD_INFORMATION_ROUTES = {
  INFORMATION: "/information",
  ORDERS: "/",
  FAVORITES: "/favorites",
  REVIEWS: "/reviews",
  DEFAULT_FROM_GUEST: "/favorites",
};

export const TYPES_ACCOUNT_ADD_INFORMATION = [
  {
    title: "Мої замовлення",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.ORDERS,
    onlyAuth: true,
  },
  {
    title: "Список бажань",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.FAVORITES,
    onlyAuth: false,
  },
  {
    title: "Мої відгуки",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS,
    onlyAuth: true,
  },
  {
    title: "Моя інформація",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.INFORMATION,
    onlyAuth: true,
  },
];
